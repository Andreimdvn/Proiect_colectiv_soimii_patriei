import logging
import re
import time

import emails

from Repository.repo_jobs import RepositoryJobs
import Database.orm

register_fields = {
    'username': str,
    'password': str,
    'email': lambda x: re.match(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', x),
    'first_name': str,
    'last_name': str,
    'date_of_birth': lambda x: re.match(r'^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$', x),
    'phone': lambda x: re.match(r'^[0-9]{10}$', x),
    'account_type': ('client', 'provider')
}
login_fields = {
    'username': str,
    'password': str
}


class Controller:

    def __init__(self, db_config):
        self.orm = Database.orm.ORM(db_config)
        self.repo = RepositoryJobs(db_config)
        self.logger = logging.getLogger()

    def login(self, request_data):
        if 'username' not in request_data or 'password' not in request_data:
            status = -1
            response = '[!] You have to specify a username and a password'
        elif request_data.get('username') and request_data.get('password'):
            status, response = self.repo.login(**request_data)
        else:
            status, response = -1, "[!] You have to specify values for parameters!"

        self.logger.debug("Login: returning status: {} response: {}".format(status, response))
        return status, response

    def register(self, request_data):
        sanitized_request = {}
        status = -1
        response = None

        for k, v in register_fields.items():
            if k not in request_data:
                if not response:
                    response = '[!] Fields [%s' % (k,)
                else:
                    response += ', ' + k
            elif v and type(v) in (str,):
                sanitized_request[k] = v(request_data[k])
            elif v and type(v) in (tuple,):
                if request_data[k] not in v:
                    if not response:
                        response = '[!] Field [%s] has an invalid value!' % (k,)
                        break
                else:
                    sanitized_request[k] = request_data[k]
            else:
                if not v(request_data[k]):
                    if not response:
                        response = '[!] Field [%s] has an invalid value!' % (k,)
                        break
                else:
                    sanitized_request[k] = request_data[k]
        else:
            if response:
                response += '] are mandatory!'
        if not response:
            status, response = self.repo.register(**sanitized_request)

        if status == 0:
            self.send_validation_mail(sanitized_request.get('email'), response.get('activation_hash'))
            response = response.get('response')

        self.logger.debug("Register: returning: status: {} response: {}".format(status, response))
        return status, response

    def send_validation_mail(self, email, activation_hash):
        """
        Send a validation email (tries 2 times) to a user to notice them to activate the account
        :param activation_hash: generated hash for activation
        :param email: the email were the activation link will be sent
        :return:
        """
        url = 'http://127.0.0.1:16000/activation'

        for i in range(2):
            m = emails.Message(
                html='<html>To activate your account <a href="%s/%s">click here</a></html>' % (url, activation_hash),
                subject='Activate your account!',
                mail_from='facultaubb@gmail.com')

            r = m.send(render={'url': url,
                               'hash': activation_hash},
                       smtp={'host': 'smtp.gmail.com',
                             'tls': True,
                             'user': 'facultaubb@gmail.com',
                             'password': 'P@rolamea'},
                       to=email)
            if r.status_code not in (250,) and i != 1:
                time.sleep(5)
            else:
                break

    def activate(self, key):
        return self.repo.activate_account(key)

    def add_job(self, request_data):
        """
        Add a new job
        :param data_request:
        :return:
        """

        status = -1
        response = None

        status, response = self.repo.add_job(request_data)

        return status, response

    def logout(self, data):
        status = 0
        response = False
        if 'token' not in data:
            status = -1

        if status:
            response = self.repo.logout(data.get('token'))

        return status, response

    def provide_data(self):
        return self.repo.provide_data()

    def view_applicants(self, request_data):
        return self.repo.view_applicants(request_data.get('id_client'))
