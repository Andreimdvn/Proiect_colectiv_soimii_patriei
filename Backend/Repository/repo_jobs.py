from dateutil.parser import parse

from Database.orm import ORM


class RepositoryJobs:

    def __init__(self, config):
        self.orm = ORM(config)

    def register(self, username=None, password=None, email=None, first_name=None, last_name=None, date_of_birth=None,
                 phone=None, account_type=None):
        try:
            r = self.orm.select('User', columns=('username',), values=(username,))
            if r:
                return -1, '[!] Username [%s] already exists in the database!' % (username,)

            r = self.orm.select('User', columns=('email',), values=(email,))
            if r:
                return -1, '[!] Email [%s] already exists in the database!' % (email,)

            user_id = self.orm.insert('User', columns=('username', 'password', 'email'),
                                      values=(username, password, email))
            if account_type == 'client':
                self.orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
                                values=(user_id, first_name, last_name, parse(date_of_birth), phone))
            elif account_type == 'provider':
                self.orm.insert('Provider', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
                                values=(user_id, first_name, last_name, parse(date_of_birth), phone))

            return 0, "Success!"
        except ValueError as e:
            return -1, str(e)
