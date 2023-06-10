#!/usr/bin/python3
""" This module contains the class for storage """
from dotenv.main import load_dotenv
from models.base import Base
from models.admin import Admin
from models.course import Course
from models.department import Department
from models.student import Student
from models.teacher import Teacher
from os import getenv, environ
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session


load_dotenv()


class Storage:
    """ database storage class """

    __engine = None
    __session = None
    __objects = {}

    def __init__(self):
        """ initializes self """

        dialect = "mysql"
        driver = "mysqlconnector"

        if getenv("DEV_MODE") == "test":
            is_test = True
            user = environ["DB_TEST_USER"]
            host = environ["DB_TEST_HOST"]
            password = environ["DB_TEST_PASSWORD"]
            db = environ["DB_TEST_DB"]
        else:
            is_test = False
            user = environ["DB_DEV_USER"]
            host = environ["DB_DEV_HOST"]
            password = environ["DB_DEV_PASSWORD"]
            db = environ["DB_DEV_DB"]

        self.__engine = create_engine("{}+{}://{}:{}@{}/{}".format(
                                      dialect, driver, user,
                                      password, host, db),
                                      pool_pre_ping=True)

        if is_test:
            Base.metadata.drop_all(self.__engine)

    def reload(self):
        """ Reloads the session and create tables """

        Base.metadata.create_all(self.__engine)
        session = sessionmaker(bind=self.__engine,
                               expire_on_commit=False)
        Session = scoped_session(session)
        self.__session = Session()

    def all(self, cls=None):
        """ gets all objects """

        self.__objects = {}
        if cls:
            if type(cls) is str:
                cls = eval(cls)
            query = self.__session.query(cls)
            for obj in query:
                key = "{}.{}".format(obj.__class__.__name__, obj.id)
                self.__objects[key] = obj
        else:
            for model in [Admin, Teacher, Student, Department, Course]:
                query = self.__session.query(model)
                for obj in query:
                    key = "{}.{}".format(obj.__class__.__name__, obj.id)
                    self.__objects[key] = obj

        return self.__objects

    def get(self, cls, id):
        """ gets a particular object """

        if type(cls) is str:
            cls = eval(cls)

        try:
            obj = self.__session.query(cls).filter(cls.id == id).one()
        except Exception:
            obj = None

        return obj

    def new(self, obj):
        """ Adds an object to the current session """

        self.__session.add(obj)

    def save(self):
        """ commits the current session """

        self.__session.commit()

    def delete(self, obj):
        """ deletes an object from the current session """

        self.__session.delete(obj)

    def get_session(self):
        """ returns the session for other queries not defined """

        return self.__session

    def close(self):
        """ removes the current session """

        self.__session.close()
