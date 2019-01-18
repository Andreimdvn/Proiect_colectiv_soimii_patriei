import string
import random

from dateutil.parser import parse
from passlib.hash import pbkdf2_sha256
from datetime import datetime

from Database.orm import ORM


class RepositoryJobs:

    def __init__(self, config):
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

    #### TO DO CLIENTU E HARDCODAT AICI
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
                'date': job.publish_date
            })
        return response

    def view_applicants(self, token):
        pk_user = self.orm.select("ActiveLogins", columns=('hash',), values=(token,), first=True)
        if not pk_user:
            return -1, 'Invalid token!'
        id_client = self.orm.select("Client", columns=('id',), values=(pk_user.id,), first=True)
        jobs = self.orm.select('Job', columns=('id_client',), values=(id_client,))
        response = []

        for job in jobs:
            id_job = job.id
            jobprovider = self.orm.select('JobProvider', columns=('id_job',), values=(id_job,))
            id_provider = jobprovider.id_provider
            provider = self.orm.select('Provider', columns=('id',), values=(id_provider,))
            response.append({
                'assigned_date': jobprovider.assigned_date,
                'first_name': provider.first_name,
                'last_name': provider.last_name,
                'title': job.title,
                'description': job.description,
            })
        return 0, response
