import os
from datetime import datetime

from Database.orm import ORM
from main import parse_input_file, WORKING_DIRECTORY


def run():
    _, db_configuration = parse_input_file(os.path.join(WORKING_DIRECTORY, 'config.json'))
    orm = ORM(db_configuration)
    orm.drop_databse()
    orm.create_database()
    populate(orm)


def populate_user(orm):
    print("Inserting into 'User'")
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('andreimdv', 'andreimdv@yahoo.com', 'pass123', False))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('root', 'root@root.com', 'root', True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('admin', 'admin@gmail.com', 'admin', False))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('admin2', 'admin2@gmail.com', 'admin', False))


def populate_client(orm):
    print("Inserting into 'Client'")
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(1, "Andrei", "Moldovan", datetime(1998, 3, 19), "0752233705"))
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(2, "Anda", "Moga", datetime(1998, 1, 1), "0123456789"))
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(3, "Alin", "Oancea", datetime(1997, 3, 3), "9999999999"))


def populate(orm):
    populate_user(orm)
    populate_client(orm)
    print("DONE")


if __name__ == '__main__':
    run()
