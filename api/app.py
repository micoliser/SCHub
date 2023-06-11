#!/usr/bin/python3
""" The main app route for the db storage """

from models import storage
from api.views import app_views
from os import environ, getenv
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from
from dotenv.main import load_dotenv


app = Flask(__name__)
# app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


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
            host=environ.get('DB_DEV_HOST', default='0.0.0.0'),
            port=environ.get('DB_DEV_PORT', default='5000'),
            threaded=True)
