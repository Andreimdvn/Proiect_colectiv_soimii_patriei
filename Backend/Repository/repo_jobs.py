import string
import random

from dateutil.parser import parse
from passlib.hash import pbkdf2_sha256

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
