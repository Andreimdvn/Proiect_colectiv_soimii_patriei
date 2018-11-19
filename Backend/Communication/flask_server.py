import json
import logging
import re

from flask import Flask, request
from flask_socketio import SocketIO

from Controller.controller import Controller


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


class FlaskServer:
    flask_app = Flask(__name__)
    app = SocketIO(flask_app)

    def __init__(self, config_data, controller: Controller):
        self.controller = controller
        self.host = config_data["flask_host"]
        self.port = config_data["flask_port"]
        self.request_data = {}
        self.logger = logging.getLogger()

        self.init_requests()

    # not necessary yet
    # def update_wrapper(self):
    #     self.app.emit("update")

    def run(self):
        self.app.run(self.flask_app, self.host, self.port)

    def shutdown_server(self):
        func = request.environ.get('werkzeug.server.shutdown')
        if func is None:
            raise RuntimeError('Not running with the Werkzeug Server')
        func()

    def stop(self):
        self.shutdown_server()

    def init_requests(self):
        self.flask_app.add_url_rule('/test', 'test_request', self.test_request, methods=['GET', 'POST'])
        self.flask_app.add_url_rule('/api/register', 'register', self.register, methods=['POST'])

    def test_request(self):
        self.request_data = request.get_json()
        self.logger.debug("Req data: {}".format(self.request_data))
        return json.dumps("Hello world! Got req: {}".format(self.request_data))

    def register(self):
        request_data = request.get_json()
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
            status, response = self.controller.register(**sanitized_request)
        return json.dumps({'status': status, 'response': response})
