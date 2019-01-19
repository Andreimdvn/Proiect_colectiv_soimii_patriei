import json
import logging
import string
import random
import base64

from dateutil.parser import parse
from passlib.hash import pbkdf2_sha256
from datetime import datetime

from Database.orm import ORM


class RepositoryJobs:

    def __init__(self, config):
        self.logger = logging.getLogger()
        self.orm = ORM(config)

    def random_hash_string(self, length=32):
        """
        Return a random like hash
        :param length: the length of the hash, default=32
        :return: string, the hash
        """
        pool = string.ascii_letters + string.digits
        return ''.join(random.choice(pool) for _ in range(length))

    def login(self, username=None, password=None):
        try:
            u = self.orm.select('User', columns=('email' if '@' in username else 'username',), values=(username,),
                                first=True)

            if u and pbkdf2_sha256.verify(password, u.password):
                # check to see if the user has activate the account
                if not u.verified_by_email:
                    raise ValueError('[!] You have to activate your account before you can login!')
                # success
                hash = self.random_hash_string()
                while self.orm.select('ActiveLogins', columns=('hash',), values=(hash,), first=True):
                    hash = self.random_hash_string()
                if u.active_users:
                    self.orm.update(table='ActiveLogins', columns=('hash',), values=(hash,), columns_where=('id_user',),
                                    values_where=(u.id,))
                else:
                    self.orm.insert('ActiveLogins', columns=('id_user', 'hash'), values=(u.id, hash))
                response = {'token': hash}
                if u.clients:
                    response.update({'type': 'client'})
                else:
                    response.update({'type': 'provider'})

            else:
                # failed
                raise ValueError('[!] Incorrect username or password!')

            return 0, response
        except ValueError as e:
            return -1, str(e)

    def register(self, username=None, password=None, email=None, first_name=None, last_name=None, date_of_birth=None,
                 phone=None, account_type=None):
        try:
            r = self.orm.select('User', columns=('username',), values=(username,))
            if r:
                raise ValueError('[!] Username [%s] already exists in the database!' % (username,))

            r = self.orm.select('User', columns=('email',), values=(email,))
            if r:
                raise ValueError('[!] Email [%s] already exists in the database!' % (email,))

            password_hash = pbkdf2_sha256.encrypt(password, rounds=2000, salt_size=16)

            user_id = self.orm.insert('User', columns=('username', 'password', 'email'),
                                      values=(username, password_hash, email))
            if account_type == 'client':
                self.orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
                                values=(user_id, first_name, last_name, parse(date_of_birth), phone))
            elif account_type == 'provider':
                self.orm.insert('Provider', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
                                values=(user_id, first_name, last_name, parse(date_of_birth), phone))

            activation_hash = self.generate_account_validation_hash(user_id)

            return 0, {'response': "Success!", 'activation_hash': activation_hash}
        except ValueError as e:
            return -1, str(e)

    def searchForJobs(self, description, type, tags):
        all_jobs = self.orm.select('Job')
        returned_jobs = []
        for job in all_jobs:
            if description is '' or description in job.description:
                if type is '' or type == job.type:
                    all_tags_in_db = self.orm.select("Tag")
                    id_needed_tags = set([tag.id for tag in all_tags_in_db if tag.name in tags])
                    all_jobtag = self.orm.select("JobTag", columns=('id_job',), values=(job.id,))
                    id_current_tags = set([tag.id_tag for tag in all_jobtag])
                    if not id_needed_tags.issubset(id_current_tags):
                        continue
                    returned_jobs.append({
                        "id": job.id,
                        "type": job.type,
                        "description": job.description,
                        "publishDate": str(job.publish_date),
                        "reward": job.reward,
                        "title": job.title,
                        "publisher": '%s - %s %s' % (job.client.company_name, job.client.first_name,
                                                     job.client.last_name)
                    })

        self.logger.info("Filtered jobs: {}".format(returned_jobs))

        return 0, returned_jobs

    def generate_account_validation_hash(self, user_id):
        generated_hash = self.random_hash_string()
        while self.orm.select('EmailValidationToken', columns=('token',), values=(generated_hash,)):
            generated_hash = self.random_hash_string()

        self.orm.insert('EmailValidationToken', columns=('id_user', 'token'), values=(user_id, generated_hash))

        return generated_hash

    def activate_account(self, key):
        token = self.orm.select('EmailValidationToken', columns=('token',), values=(key,), first=True)
        if token:
            self.orm.update('User', columns=('verified_by_email',), values=(True,), columns_where=('id',),
                            values_where=(token.id_user,))
            return 'Your account was successfully activated!'
        return 'Something went wrong!'


    def add_job(self, request_data):
        try:

            pk_user = self.orm.select("ActiveLogins", columns=('hash',), values=(request_data['token'],), first=True)
            pk_client = self.orm.select("Client", columns=('id',), values=(pk_user.id,), first=True)
            job_pk = self.orm.insert("Job", columns=('title', 'id_client', 'description', 'provider_description',
                                                     'client_description', 'reward', 'street', 'city', 'country',
                                                     'type', 'publish_date'),
                                     values=(request_data['job']['title'], pk_client.id, request_data['job']['jobDesc'],
                                             request_data['job']['candidateDesc'], request_data['job']['employerDesc'],
                                             request_data['job']['payment'], request_data['job']['street'],
                                             request_data['job']['city'],
                                             request_data['job']['county'], request_data['job']['jobType'], None))

            for tag in request_data['job']['tags']:
                tag_pk = self.orm.insert("Tag", columns=('name',),
                                         values=(tag,))
                self.orm.insert("JobTag", columns=('id_job', 'id_tag'),
                                values=(job_pk, tag_pk))

            return 0, "Added sucessfully"
        except ValueError as e:
            return -1, str(e)

    def get_job(self, job_id):
        job = self.orm.select('Job', columns=('id',), values=(job_id,), first=True)
        if job:
            return 0, {
                'title': job.title,
                'jobDescription': job.description,
                'candidateDescription': job.provider_description,
                'employer': '%s %s' % (job.client.first_name, job.client.last_name),
                'payment': job.reward,
                'address': '%s; %s - %s' % (job.street, job.city, job.country),
                'jobType': job.type,
                'tags': [t.tag.tag_job[0].tag.name for t in job.job_tag]
            }
        return -1, "Required job doesn't exist!"

    def request_job(self, token=None, job_id=None):
        status = -1
        response = None
        if token and job_id:
            r_provider = self.orm.select('ActiveLogins', columns=('hash',), values=(token,), first=True)
            if r_provider and self.orm.select('Provider', columns=('id',), values=(r_provider.id_user,), first=True):
                r_job = self.orm.select('Job', columns=('id',), values=(job_id,), first=True)
                if r_job:
                    exists = self.orm.select('JobRequest', columns=('id_job', 'id_provider'), values=(r_job.id,
                                                                                                      r_provider.id_user),
                                             first=True)
                    if exists:
                        response = 'Provider already requested this job!'
                    else:
                        self.orm.insert('JobRequest', values=(r_job.id, r_provider.id_user, None, False))
                        status = 0
                        response = 'Job request was successfully processed!'
                else:
                    response = 'Invalid job id!'
            else:
                response = 'Invalid token!'

        response = 'Give some values!' if not response else response
        return status, response

    def logout(self, token):
        tkn = self.orm.select('ActiveLogins', columns=('hash',), values=(token,), first=True)
        if tkn and tkn.active:
            self.orm.update('ActiveLogins', columns=('active',), values=(False,), columns_where=('hash',),
                            values_where=(token,))
            return True

        return False

    def provide_data(self):
        jobs = self.orm.select('Job')
        response = []

        for job in jobs:
            response.append({
                'id': job.id,
                'type': job.description,
                'description': job.description,
                'publisher': '%s %s' % (job.client.first_name, job.client.last_name),
                'reward': job.reward,
                'publishDate': job.publish_date
            })
        return response

    def view_applicants(self, token):
        pk_user = self.orm.select("ActiveLogins", columns=('hash',), values=(token,), first=True)
        if not pk_user:
            return -1, 'Invalid token!'
        id_client = self.orm.select("Client", columns=('id',), values=(pk_user.id,), first=True)
        jobs = self.orm.select('Job', columns=('id_client',), values=(id_client.id,))
        response = []

        for job in jobs:
            id_job = job.id
            jobprovider = self.orm.select('JobRequest', columns=('id_job',), values=(id_job,))
            for job_provider_entity in jobprovider:
                id_provider = job_provider_entity.id_provider
                provider = self.orm.select('Provider', columns=('id',), values=(id_provider,))
                response.append({
                    'assigned_date': str(job_provider_entity.request_date),
                    'first_name': provider[0].first_name,
                    'last_name': provider[0].last_name,
                    'title': job.title,
                    'description': job.description,
                    'provider_id': provider[0].id,
                    'job_id': job.id
                })
        return 0, response


    def jobs_for_provider(self, request_data):
        try:
            jobs_for_provider = []
            pk_user = self.orm.select("ActiveLogins", columns=('hash',), values=(request_data['token'],), first=True)
            pk_provider = self.orm.select("Provider", columns=('id',), values=(pk_user.id_user,), first=True)

            id_jobs = self.orm.select("JobRequest", columns=('id_provider',), values=(pk_provider.id,))
            for current_job in id_jobs:
                jobs = self.orm.select("Job", columns=('id',), values=(current_job.id_job,))
                for job in jobs:
                    jobs_for_provider.append({"id": job.id, "title": job.title, "date": str(current_job.request_date)})
            return  0, jobs_for_provider
        except ValueError as e:
            return -1, str(e)

    def profile(self, token):
        user = self.orm.select('ActiveLogins', columns=('hash',), values=(token,), first=True).user
        if user.clients:
            # client profile
            client = user.clients[0]

            return {
                'company_name': client.company_name,
                'site_link': client.site_link,
                'email': client.user.email,
                'phone': client.phone,
                'details': client.details,
                'name': '%s %s' % (client.first_name, client.last_name),
                'avatar': base64.b64encode(client.user.avatar).decode('ascii') if client.user.avatar else None

            }
        elif user.providers:
            # provider profile
            provider = user.providers[0]

            return {
                'username': provider.user.username,
                'email': provider.user.email,
                'phone': provider.phone,
                'name': '%s %s' % (provider.first_name, provider.last_name),
                'avatar': base64.b64encode(provider.user.avatar).decode('ascii') if provider.user.avatar else None,
                'cv': base64.b64encode(provider.cv).decode('ascii') if provider.cv else None
            }

        return "Invalid parameters!"

    def edit_profile(self, data):
        user = self.orm.select('ActiveLogins', columns=('hash',), values=(data.get('token'),), first=True).user
        if user.clients:
            client_fields = ('site_link', 'company_name', 'phone', 'details', 'avatar')
            for k, v in data.items():
                if k in client_fields:
                    if k not in ('avatar',):
                        self.orm.update('Client', columns=(k,), values=(v,), columns_where=('id',),
                                        values_where=(user.id,))
                    else:
                        v = base64.b64decode(v)
                        self.orm.update('User', columns=(k,), values=(v,), columns_where=('id',),
                                        values_where=(user.id,))
        elif user.providers:
            provider_fields = ('phone', 'cv', 'avatar')
            for k, v in data.items():
                if k in provider_fields:
                    if k not in ('avatar', 'cv'):
                        self.orm.update('Provider', columns=(k,), values=(v,), columns_where=('id',),
                                        values_where=(user.id,))
                    else:
                        v = base64.b64decode(v)
                        self.orm.update('User', columns=(k,), values=(v,), columns_where=('id',),
                                        values_where=(user.id,))

        return 'Success!'

    def token_validation(self, token):
        tkn = self.orm.select('ActiveLogins', columns=('hash',), values=(token,), first=True)
        if not tkn or not tkn.active:
            return False
        return True

    def get_job_types(self):
        job_type = []
        for job in self.orm.select('Job'):
            if job.type not in job_type:
                job_type.append(job.type)
        return job_type
