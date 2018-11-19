from Repository.repo_jobs import RepositoryJobs


class Controller:

    def __init__(self, db_config):
        self.repo = RepositoryJobs(db_config)

    def login(self, username=None, password=None):
        pass

    def register(self, **args):
        return self.repo.register(**args)
