import sys
import datetime
import logging

import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Date, create_engine, Boolean, DateTime
from sqlalchemy.orm import relationship, sessionmaker, scoped_session
from sqlalchemy.dialects import mysql

# username / password / host / port / database
MYSQL_CON_STRING = 'mysql://%s:%s@%s:%s/%s'

DB = declarative_base()


class User(DB):
    __tablename__ = 'User'

    id = Column(Integer, autoincrement=True, primary_key=True)
    username = Column(String(100), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    avatar = Column(sa.LargeBinary().with_variant(mysql.LONGBLOB(), 'mysql'), nullable=True)
    verified_by_email = Column(Boolean, nullable=False, default=False)

    clients = relationship('Client', back_populates='user')
    providers = relationship('Provider', back_populates='user')
    active_users = relationship('ActiveLogins', back_populates='user')
    unactivated_user = relationship('EmailValidationToken', back_populates='user')


class ActiveLogins(DB):
    __tablename__ = 'ActiveLogins'

    id = Column(Integer, autoincrement=True, primary_key=True)
    id_user = Column(Integer, ForeignKey(User.id), nullable=False)
    hash = Column(String(100), nullable=False)
    active = Column(Boolean, nullable=False, default=True)

    user = relationship('User', back_populates='active_users')


class EmailValidationToken(DB):
    __tablename__ = 'EmailValidationToken'

    id = Column(Integer, autoincrement=True, primary_key=True)
    id_user = Column(Integer, ForeignKey(User.id), nullable=False)
    token = Column(String(100), nullable=False)

    user = relationship('User', back_populates='unactivated_user')


class Client(DB):
    __tablename__ = 'Client'

    id = Column(Integer, ForeignKey(User.id), nullable=False, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    company_name = Column(String(100), nullable=True)
    site_link = Column(String(100), nullable=True)
    details = Column(String(1000), nullable=True)
    phone = Column(String(20), nullable=False, default=False)

    user = relationship('User', back_populates='clients')
    reviews = relationship('ClientReview', back_populates='client')
    # recommendations_from = relationship('Recommendation', back_populates='client_from')
    # recommendations_to = relationship('Recommendation', back_populates='client_to')
    jobs = relationship('Job', back_populates='client')


class Provider(DB):
    __tablename__ = 'Provider'

    id = Column(Integer, ForeignKey(User.id), nullable=False, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    phone = Column(String(20), nullable=False, default=False)
    cv = Column(sa.LargeBinary().with_variant(mysql.LONGBLOB(), 'mysql'), nullable=True)

    user = relationship('User', back_populates='providers')
    reviews = relationship('ProviderReview', back_populates='providers')
    recommended_provider = relationship('Recommendation', back_populates='provider')
    jobs = relationship('JobProvider', back_populates='provider')
    requests = relationship('JobRequest', back_populates='provider')


class ProviderReview(DB):
    __tablename__ = 'ProviderReview'

    id = Column(Integer, autoincrement=True, primary_key=True)
    id_provider = Column(Integer, ForeignKey(Provider.id), nullable=False)
    description = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False, default=0)

    providers = relationship('Provider', back_populates='reviews')


class ClientReview(DB):
    __tablename__ = 'ClientReview'

    id = Column(Integer, autoincrement=True, primary_key=True)
    id_client = Column(Integer, ForeignKey(Client.id), nullable=False)
    description = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False, default=0)

    client = relationship('Client', back_populates='reviews')


class Recommendation(DB):
    __tablename__ = 'Recommendation'

    id = Column(Integer, autoincrement=True, primary_key=True)
    id_client_from = Column(Integer, ForeignKey(Client.id), nullable=False)
    id_client_to = Column(Integer, ForeignKey(Client.id), nullable=False)
    id_provider = Column(Integer, ForeignKey(Provider.id), nullable=False)
    message = Column(String(100), nullable=True)

    # client_from = relationship('Client', back_populates=[id_client_from])
    # client_to = relationship('Client', foreign_keys=[id_client_to])
    provider = relationship('Provider', back_populates='recommended_provider')


class Ability(DB):
    __tablename__ = 'Ability'

    id = Column(Integer, autoincrement=True, primary_key=True)
    ability = Column(String(100), nullable=False)


class ProviderAbilities(DB):
    __tablename__ = 'ProviderAbilities'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    id_provider = Column(Integer, ForeignKey(Provider.id), nullable=False)
    id_ability = Column(Integer, ForeignKey(Ability.id), nullable=False)

    abilities = relationship('Ability')


class JobTag(DB):
    __tablename__ = 'JobTag'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_job = Column(Integer, ForeignKey('Job.id'))
    id_tag = Column(Integer, ForeignKey('Tag.id'))

    job = relationship('Job', back_populates='job_tag')
    tag = relationship('Tag', back_populates='tag_job')


class Job(DB):
    __tablename__ = 'Job'

    id = Column(Integer, autoincrement=True, primary_key=True)
    id_client = Column(Integer, ForeignKey(Client.id), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(String(100), nullable=False)
    provider_description = Column(String(100), nullable=False)
    client_description = Column(String(100), nullable=False)
    reward = Column(String(100), nullable=False)
    street = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    type = Column(String(100), nullable=False)

    publish_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

    client = relationship('Client', back_populates='jobs')
    given_to = relationship('JobProvider', back_populates='job')
    requests = relationship('JobRequest', back_populates='job')
    job_tag = relationship('JobTag', back_populates='job')


class Tag(DB):
    __tablename__ = 'Tag'

    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(100), nullable=False)

    tag_job = relationship('JobTag', back_populates='tag')


class JobProvider(DB):
    __tablename__ = 'JobProvider'

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    id_job = Column(Integer, ForeignKey(Job.id), nullable=False)
    id_provider = Column(Integer, ForeignKey(Provider.id), nullable=False)
    assigned_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

    job = relationship('Job', back_populates='given_to')
    provider = relationship('Provider', back_populates='jobs')


class JobRequest(DB):
    __tablename__ = 'JobRequest'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=True)
    id_job = Column(Integer, ForeignKey(Job.id), nullable=False)
    id_provider = Column(Integer, ForeignKey(Provider.id), nullable=False)
    request_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    response = Column(Boolean, nullable=False, default=False)

    job = relationship('Job', back_populates='requests')
    provider = relationship('Provider', back_populates='requests')


class ORM:

    def __init__(self, config):
        con_string = MYSQL_CON_STRING % (config['mysql_username'], config['mysql_password'], config['mysql_server'],
                                         config['mysql_port'], config['mysql_database'])

        self.engine = create_engine(con_string, pool_size=500)
        self.session = scoped_session(sessionmaker(bind=self.engine))
        self.ses = None
        logging.basicConfig()
        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
        self.create_database()

    def create_database(self):
        DB.metadata.create_all(self.engine)

    def drop_database(self):
        DB.metadata.drop_all(self.engine)

    def columns_objects(self, table, columns):
        cols = []
        for col in columns:
            try:
                c = getattr(table, col)
            except AttributeError:
                c = None
            if not c:
                raise ValueError('[!] Column [%s] is not present in table [%s]!' % (col, table))
            cols.append(c)
        return cols

    def table_object(self, table):
        try:
            tb = getattr(sys.modules[__name__], table)
        except AttributeError:
            tb = None
        if not tb:
            raise ValueError('[!] Table [%s] couldn\'t be found!' % table)
        return tb

    def insert(self, table, columns=None, values=None):
        """
        Insert into table, into specified columns values provided.
        :param table:
        :param columns:
        :param values:
        :return:
        """
        if columns:
            if type(columns) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for columns!' % type(columns))
        if values:
            if type(values) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for values!' % type(values))
        tb = self.table_object(table)
        self.ses = self.session()
        if columns:
            cols = self.columns_objects(tb, columns)
            if len(cols) != len(values):
                raise ValueError('[!] Columns and values are not equal!')
            col_val = {e[0]: e[1] for e in zip(columns, values)}
            new_object = tb(**col_val)
            self.ses.add(new_object)
        else:
            cols = [c.key for c in tb.__table__.columns if c.key != 'id']
            if len(cols) != len(values):
                raise ValueError('[!] Columns and values number are not equal!')
            col_val = {e[0]: e[1] for e in zip(cols, values)}
            new_object = tb(**col_val)
            self.ses.add(new_object)
        self.ses.commit()
        self.ses.flush()
        self.ses.refresh(new_object)

        return new_object.id

    def select(self, table, columns=None, values=None, like_columns=None, like_values=None, first=False):
        """
        Execute a query on all rows in a table and returns the results with all the columns.
        :param table: table name to be queried.
        :param columns: list with required columns for the WHERE clause.
        :param values: list with values corresponding to the given columns
        :param like_columns:
        :param like_values:
        :param first: only the first item is returned.
        :return: if first==False, a list with: objects of table type if no columns were specified, tuples<Column> otherwise.
                 if first==True, a single object is returned instead of a list
        """
        if columns:
            if type(columns) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for columns!' % type(columns))
        if values:
            if type(values) not in (list, tuple):
                raise ValueError('[!] Type [%s] for values are not allowed! Use list or tuple.' % type(values))
        if like_columns:
            if type(like_columns) not in (list, tuple):
                raise ValueError('[!] Type [%s] for like_cols are not allowed! Use list or tuple.' % type(like_columns))
            if not like_values or type(like_values) not in (list, tuple):
                raise ValueError('[!] Type [%s] for like_vals are not allowed! Use list or tuple.' % type(like_values))
        tb = self.table_object(table)
        self.ses = self.session()
        if not columns:
            res = self.ses.query(tb)
        elif not values:
            cols = [getattr(tb, c) for c in columns]
            res = self.ses.query(*cols)
        else:
            cols = [getattr(tb, c) for c in columns]
            if len(cols) != len(values):
                raise ValueError('[!] There are not enough values/columns!')
            col_val = {e[0].key: e[1] for e in zip(cols, values)}
            like_col_val = None
            if like_columns:
                if len(like_columns) != len(like_values):
                    raise ValueError('[!] There are not enough like_values/like_columns!')
                like_cols = [getattr(tb, c) for c in like_columns]

                like_col_val = [e[0].like('%' + e[1] + '%',) for e in zip(like_cols, like_values)]

            if like_col_val:
                res = self.ses.query(tb).filter_by(**col_val)
                res = res.filter(*like_col_val)
            else:
                res = self.ses.query(tb).filter_by(**col_val)
        result = res.first() if first else res.all()
        return result

    def update(self, table, columns_where=None, values_where=None, columns=None, values=None):
        """
        Execute an update on a specified table.
        :param table:
        :param columns_where:
        :param values_where:
        :param columns:
        :param values:
        :return:
        """
        if columns_where:
            if type(columns_where) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for columns in where clause!' % type(columns))
            if len(columns_where) < 1:
                raise ValueError('[!] Specify some columns!')
            if values_where:
                if type(values_where) not in (list, tuple):
                    raise ValueError('[!] Type [%s] is not allowed for values!' % type(columns))
                if len(values_where) < 1:
                    raise ValueError('[!] Specify some columns!')
            if len(columns_where) != len(values_where):
                raise ValueError('[!] Columns and values for where clause in update are wrong!')
        else:
            if values_where:
                raise ValueError('[!] Specify columns for where clause!')
        if columns:
            if type(columns) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for columns!' % type(columns))
            if len(columns) < 1:
                raise ValueError('[!] Specify some columns!')
        else:
            raise ValueError('[!] Specify columns to update!')
        if values:
            if type(values) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for values!' % type(values))
            if len(values) < 1:
                raise ValueError('[!] Specify some values!')
        else:
            raise ValueError('[!] Specify new values to update!')
        if len(values) != len(columns):
            raise ValueError('[!] There are not enough values/columns!')

        tb = self.table_object(table)
        items = self.select(table, columns=columns_where, values=values_where)

        cols = [getattr(tb, c) for c in columns]
        if len(cols) != len(values):
            raise ValueError('[!] There are not enough values/columns!')
        for item in items:
            for i, col in enumerate(columns):
                setattr(item, col, values[i])
        self.ses.commit()
        self.ses.flush()

    def delete(self, table, columns=None, values=None):
        """
        Execute a delete on a table with specific columns and values.
        :param table:
        :param columns:
        :param values:
        :return:
        """
        if columns:
            if type(columns) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for columns!' % type(columns))
            if len(columns) < 1:
                raise ValueError('[!] Specify some columns!')
        else:
            raise ValueError('[!] Specify columns for where clause!')
        if values:
            if type(values) not in (list, tuple):
                raise ValueError('[!] Type [%s] is not allowed for values!' % type(values))
            if len(values) < 1:
                raise ValueError('[!] Specify some values!')
        else:
            raise ValueError('[!] Specify values for where clause!')
        if len(values) != len(columns):
            raise ValueError('[!] There are not enough values/columns!')
        items = self.select(table, columns, values)
        if not items:
            raise ValueError('[!] Item with specified values doesn\'t exists!')
        for item in items:
            self.ses.delete(item)
        self.ses.commit()
        self.ses.flush()
