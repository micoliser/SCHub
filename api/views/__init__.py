#!/usr/bin/python3
""" Blueprint for schub api """

from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/')

from api.views.index import *
from api.views.students import *
# from api.views.admins import *
# from api.views.courses import *
# from api.views.teachers import *
