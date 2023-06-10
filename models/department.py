#!/usr/bin/python3
""" This module contains the department class """
from models.base import BaseModel
from models.person import Person
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Department(BaseModel, Person):
    """ defines the department class """

    __tablename__ = "departments"
    name = Column(String(45), nullable=False)
    teachers = relationship("Teacher",
                             backref="department",
                             cascade="all")
    courses = relationship("Course",
                           backref="department",
                           cascade="all")
