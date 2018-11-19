import Database.orm


class Controller:
    def __init__(self, db_config):
        self.orm = Database.orm.ORM(db_config)
