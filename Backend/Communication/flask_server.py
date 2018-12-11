import json
import logging

from flask import Flask, request
from flask_socketio import SocketIO

from Controller.controller import Controller


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
        self.flask_app.add_url_rule('/api/login', 'login', self.login, methods=['POST'])
        self.flask_app.add_url_rule('/activation/<key>', 'activation/<key>', self.activation, methods=['GET'])

    def test_request(self):
        self.request_data = request.get_json()
        self.logger.debug("Req data: {}".format(self.request_data))
        return json.dumps("Hello world! Got req: {}".format(self.request_data))

    def register(self):
        request_data = request.get_json() or {}
        status, response = self.controller.register(request_data)
        return json.dumps({'status': status, 'response': response})

    def login(self):
        request_data = request.get_json() or {}
        status, response = self.controller.login(request_data)
        return json.dumps({'status': status, 'response': response})

    def activation(self, key):
        return self.controller.activate(key)
