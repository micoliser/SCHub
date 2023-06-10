#!/usr/bin/python3
""" This module contains the admin class """
from models.base import BaseModel
from models.person import Person


class Admin(BaseModel, Person):
    """ defines the admin class """

    __tablename__ = "admins"
