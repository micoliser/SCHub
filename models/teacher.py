#!/usr/bin/python3
""" This module contains the teacher class """
from models.base import BaseModel
from models.person import Person
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Teacher(BaseModel, Person):
    """ defines the teacher class """

    __tablename__ = "admins"
    department_id = Column(String(30),
                           ForeignKey("dapartments.id"),
                           nullable=False)
    courses = relationship("Course",
                           backref="teacher",
                           cascade="all")
