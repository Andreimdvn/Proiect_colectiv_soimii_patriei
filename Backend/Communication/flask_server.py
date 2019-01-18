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
        self.flask_app.add_url_rule('/api/add_job', 'add_job', self.add_job, methods=['POST'])
        self.flask_app.add_url_rule('/api/logout', 'logout', self.logout, methods=['POST'])
        self.flask_app.add_url_rule('/api/jobs', 'jobs', self.jobs, methods=['POST'])
        self.flask_app.add_url_rule('/api/jobs_for_provider', 'jobs_for_provider', self.jobs_for_provider, methods=['POST'])

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

    def add_job(self):
        request_data = request.get_json() or {}
        status, response = self.controller.add_job(request_data)
        return json.dumps({'status': status, 'response': response})

    def logout(self):
        request_data = request.get_json() or {}
        status, response = self.controller.logout(request_data)
        return json.dumps({'status': status, 'response': response})

    def jobs(self):
        request_data = request.get_json() or {}

        status = 0
        if 'token' not in request_data:
            status = -1
            response = 'Invalid parameters!'
        else:
            response = self.controller.provide_data()

        return json.dumps({'status': status, 'response': response}, indent=4, sort_keys=True, default=str)

    def jobs_for_provider(self):
        request_data = request.get_json() or {}
        status, response = self.controller.jobs_for_provider(request_data)
        return json.dumps({'status' : status, 'response' : response})