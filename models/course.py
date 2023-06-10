#!/usr/bin/python3
""" This module contains the course class """
from models.base import BaseModel
from sqlalchemy import Column, String, Integer, ForeignKey


class Course(BaseModel):
    """ defines the course class """

    __tablename__ = "courses"
    name = Column(String(30), nullable=False)
    level = Column(Integer, nullable=False)
    department_id = Column(String(30),
                           ForeignKey("departments.id"),
                           nullable=False)
    teacher_id = Column(String(30),
                        ForeignKey("teachers.id"),
                        nullable=False)
