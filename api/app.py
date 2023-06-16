#!/usr/bin/python3
""" The main app route for the db storage """

from models import storage
from api.views import app_views
from api.auths import auth
from os import environ, getenv
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from flasgger import Swagger
from flasgger.utils import swag_from
from dotenv.main import load_dotenv


app = Flask(__name__)
app.config['SECRET_KEY'] = 'pretty_key121'

login_manager = LoginManager(app)

app.register_blueprint(app_views)
app.register_blueprint(auth)

cors = CORS(app, supports_credentials=True)


@login_manager.user_loader
def load_user(user_id):
    """ Retrieves a user by id """

    user_types = ['Admin', 'Teacher', 'Student']
    for user_type in user_types:
        user = storage.get(user_type, user_id)
        if user is not None:
            return user


@app.teardown_appcontext
def close_db(err):
    """ Closes the storage session on an error """

    storage.close()


@app.errorhandler(404)
def not_found(err):
    """ 404 Error
    ---
    responses:
      404:
        description: The path to this resource was not found, Check your input
    """

    response = make_response(jsonify({'Error': 'Not Found'}), 404)
    return response


app.config['SWAGGER'] = {
        'title': 'SCHub API',
        'uiversion': 3
        }

Swagger(app)


if __name__ == '__main__':
    """ Runs the app with the environment variables """

    load_dotenv()
    app.run(
            host='0.0.0.0',
            port=environ.get('DB_DEV_PORT', default='5000'),
            threaded=True)
