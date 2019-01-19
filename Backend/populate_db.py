import os
from datetime import datetime

from passlib.handlers.pbkdf2 import pbkdf2_sha256

from Database.orm import ORM
from main import parse_input_file, WORKING_DIRECTORY


def run():
    _, db_configuration = parse_input_file(os.path.join(WORKING_DIRECTORY, 'config.json'))
    orm = ORM(db_configuration)
    orm.drop_database()
    orm.create_database()
    populate(orm)


def hash_pass(password):
    return pbkdf2_sha256.encrypt(password, rounds=2000, salt_size=16)


def populate_user(orm):
    print("Inserting into 'User'")
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('andreimdv', 'andreimdv@yahoo.com', hash_pass('pass123'), True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('root', 'root@root.com', hash_pass('root'), True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('admin', 'admin@gmail.com', hash_pass('admin'), True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('client', 'admin6@gmail.com', hash_pass('client'), True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('client2', 'admin7@gmail.com', hash_pass('client2'), True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('provider', 'admin8@gmail.com', hash_pass('provider'), True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('provider2', 'admin9@gmail.com', hash_pass('provider2'), True))
    orm.insert('User', columns=('username', 'email', 'password', 'verified_by_email'),
               values=('provider3', 'admin10@gmail.com', hash_pass('provider3'), True))


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
               values=(7, "Olaru", "Iustin", datetime(1998, 3, 19), "075223705"))
    orm.insert('Provider', columns=('id', 'first_name', 'last_name', 'date_of_birth', 'phone'),
               values=(8, "Moldovan", "Daniel", datetime(1998, 3, 19), "075223705"))


def populate_job(orm):
    print("Insert into 'Job'")
    orm.insert('Job', columns=('id_client', 'title', 'description', 'provider_description', 'client_description',
                                    'reward', 'street', 'city', 'country', 'type', 'publish_date'),
               values=(1, 'Plimba-mi cainele!', 'Plimba animalul tau preferat!', 'iubitor de animale',
                       'Adapost de animale care cauta oameni carora le place sa isi petreaca timpul cu animalele',
                       '50 RON/zi', 'Dorobantilor nr. 1', 'Cluj-Napoca', 'Romania', 'one_time', datetime.today()))

    orm.insert('Job', columns=('id_client', 'title', 'description', 'provider_description', 'client_description',
                                    'reward', 'street', 'city', 'country', 'type', 'publish_date'),
               values=(2, 'Impartit pliante', 'Imparte pliante in Auchan.',
                       'Companie de impartit pliante cu peste 100 de colaboratori', 'Persoana sociabila si comunicativa'
                       , '80 RON/zi, 6 ore', 'Iulius Mall', 'Cluj-Napoca', 'Romania', 'in_weekend', datetime.today()))

    orm.insert('Job', columns=('id_client', 'title', 'description', 'provider_description', 'client_description',
                                    'reward', 'street', 'city', 'country', 'type', 'publish_date'),
               values=(3, 'Ghid pentru turisti',
                       'Insoteste grupuri de turisti din toata lumea si arata-le frumusetea Clujului!',
                       'Companie de turism cu destinatii in toata lumea.',
                       'Persoane care limbi straine la nivel avansat si sunt familiari cu orasul Cluj!',
                       '150 RON/zi', '-', 'Cluj-Napoca', 'Romania', 'one_time', datetime.today()))

    orm.insert('Job', columns=('id_client', 'title', 'description', 'provider_description', 'client_description',
                                    'reward', 'street', 'city', 'country', 'type', 'publish_date'),
               values=(4, 'Bucatar personal', 'Gateste cea mai buna mancare traditionala romaneasca!',
                       'Persoana care are nevoie de un bucatar pentru o  cina privata', 'Bucatar cu experienta',
                       '500 RON', '-', 'Bucuresti', 'Romania', 'one_time', datetime.today()))

    orm.insert('Job', columns=('id_client', 'title', 'description', 'provider_description', 'client_description',
                                    'reward', 'street', 'city', 'country', 'type', 'publish_date'),
               values=(4, 'Tunde gazonul', 'Mai multe gazoane de 300mp',
                       'Proprietar a 10 proprietati in cluj', '-',
                       '150 RON/ZI', '-', 'Cluj-Napoca', 'Romania', 'every_2_weeks', datetime.today()))


def populate_tags(orm):
    print("Insert into 'Tag'")
    orm.insert('Tag', columns=('name',), values=("animale",))
    orm.insert('Tag', columns=('name',), values=("plimbare",))
    orm.insert('Tag', columns=('name',), values=("pisica",))

    orm.insert('Tag', columns=('name',), values=("pliante",))
    orm.insert('Tag', columns=('name',), values=("promovare",))

    orm.insert('Tag', columns=('name',), values=("turism",))
    orm.insert('Tag', columns=('name',), values=("lovecluj",))

    orm.insert('Tag', columns=('name',), values=("mancare",))
    orm.insert('Tag', columns=('name',), values=("bucatar_sef",))

    orm.insert('Tag', columns=('name',), values=("aer_liber",))
    orm.insert('Tag', columns=('name',), values=("tunde_iarba",))


def populate_jobtag(orm):
    print("Insert into 'Jobtag'")
    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(1, 1))
    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(1, 2))
    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(1, 3))

    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(2, 4))
    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(2, 5))

    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(3, 6))
    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(3, 7))

    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(4, 8))
    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(4, 9))

    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(5, 10))
    orm.insert('JobTag', columns=('id_job', 'id_tag'), values=(5, 11))


def populate_jobrequest(orm):
    print("Insert into 'JobRequest'")
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(1, 6, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(2, 6, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(3, 6, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(4, 6, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(1, 7, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(2, 7, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(2, 7, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(3, 7, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(3, 8, datetime.now(), 0))
    orm.insert('JobRequest', columns=('id_job', 'id_provider', 'request_date', 'response'),
               values=(4, 8, datetime.now(), 0))


def populate(orm):
    populate_user(orm)
    populate_client(orm)
    populate_provider(orm)
    populate_job(orm)
    populate_tags(orm)
    populate_jobtag(orm)
    populate_jobrequest(orm)

    print("DONE")


if __name__ == '__main__':
    run()
