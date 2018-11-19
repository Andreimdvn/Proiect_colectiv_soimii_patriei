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
    'phone': str,
    'account_type': ('client', 'provider')
}


class Controller:

    def __init__(self, db_config):
        self.repo = RepositoryJobs(db_config)
        self.logger = logging.getLogger()

    def login(self, username=None, password=None):
        pass

    def register(self, request_data):
        sanitized_request = {}
        status = -1
        response = None

        for k, v in register_fields.items():
            if k not in request_data:
                if not response:
                    response = '[!] Field(s) [%s' % (k,)
                else:
                    response += ', ' + k
            elif type(v) in (str,):
                sanitized_request[k] = v(request_data[k])
            elif type(v) in (tuple,):
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
                response += '] is(are) mandatory!'
        if not response:
            status, response = self.repo.register(**sanitized_request)

        self.logger.debug("Register: returning: status: {} response:{}".format(status, response))
        return status, response
