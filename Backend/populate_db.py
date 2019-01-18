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
               values=('client', 'admin6@gmail.com', 'client', False))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('client2', 'admin7@gmail.com', 'client2', False))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('provider', 'admin8@gmail.com', 'provider', False))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('provider2', 'admin9@gmail.com', 'provider2', False))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('provider3', 'admin10@gmail.com', 'provider3', False))


def populate_client(orm):
    print("Inserting into 'Client'")
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(1, "Andrei", "Moldovan", datetime(1998, 3, 19), "072233705"))
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(2, "Anda", "Moga", datetime(1998, 1, 1), "012345689"))
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(3, "Alin", "Oancea", datetime(1997, 3, 3), "999999999"))
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(4, "Moldovan", "Andrei", datetime(1997, 3, 3), "999999999"))
    orm.insert('Client', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(5, "Alin", "Oancea", datetime(1997, 3, 3), "999999999"))


def populate_provider(orm):
    print("Insert into 'Provider'")
    orm.insert('Provider', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(6, "Moga", "Anda", datetime(1998, 3, 19), "075223705"))
    orm.insert('Provider', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(6, "Olaru", "Iustin", datetime(1998, 3, 19), "075223705"))
    orm.insert('Provider', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(6, "Moldovan", "Daniel", datetime(1998, 3, 19), "075223705"))


def populate_job(orm):
    print("Insert into 'Job'")
    orm.insert('Provider', columns=('id_client', 'title', 'description', 'provider_description', 'client_description',
                                    'reward', 'street', 'city', 'country', 'type', 'publish_date'),
               values=(1, 'SC PLIMBA-MA SRL', 'Plimba animalul tau preferat!', 'iubitor de animale',
                       'Adapost de animale care cauta oameni carora le place sa isi petreaca timpul cu animalele', ''))


def populate(orm):
    populate_user(orm)
    populate_client(orm)
    populate_provider(orm)
    populate_job(orm)

    print("DONE")


if __name__ == '__main__':
    run()
