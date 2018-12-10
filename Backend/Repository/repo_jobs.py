from dateutil.parser import parse
from passlib.hash import pbkdf2_sha256
import string
import random

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
                # success
                hash = self.random_hash_string()
                while self.orm.select('ActiveLogins', columns=('hash',), values=(hash,), first=True):
                    hash = self.random_hash_string()
                if u.active_users:
                    self.orm.update(table='ActiveLogins', columns=('hash',), values=(hash,), columns_where=('id_user',),
                                    values_where=(u.id,))
                else:
                    self.orm.insert('ActiveLogins', columns=('id_user', 'hash'), values=(u.id, hash))
                response = hash

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
                return -1, '[!] Username [%s] already exists in the database!' % (username,)

            r = self.orm.select('User', columns=('email',), values=(email,))
            if r:
                return -1, '[!] Email [%s] already exists in the database!' % (email,)

            password_hash = pbkdf2_sha256.encrypt(password, rounds=2000, salt_size=16)

            user_id = self.orm.insert('User', columns=('username', 'password', 'email'),
                                      values=(username, password_hash, email))
            if account_type == 'client':
                self.orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
                                values=(user_id, first_name, last_name, parse(date_of_birth), phone))
            elif account_type == 'provider':
                self.orm.insert('Provider', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
                                values=(user_id, first_name, last_name, parse(date_of_birth), phone))

            return 0, "Success!"
        except ValueError as e:
            return -1, str(e)
