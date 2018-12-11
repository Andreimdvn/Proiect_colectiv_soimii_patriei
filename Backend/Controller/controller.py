import Database.orm
import logging
import re

from Repository.repo_jobs import RepositoryJobs

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

        self.logger.debug("Register: returning: status: {} response: {}".format(status, response))
        return status, response
