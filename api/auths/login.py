#!/usr/bin/python3
""" configures the auth """
from api.auths import auth
from flask import current_app, make_response, jsonify, request, abort
from flask_login import current_user, login_user, logout_user, login_required
from models import storage
import jwt


@auth.route('/login',
            methods=['POST'],
            strict_slashes=False)
def login():
    """ Login the user """

    try:
        credentials = request.get_json()
    except Exception:
        abort(401, 'Not a valid json')

    login_type = credentials.get('type')
    email = credentials.get('email')
    password = credentials.get('password')

    all_objs = storage.all(login_type)
    user = None
    for obj in all_objs.values():
        if obj.email == email:
            if obj.password == password:
                user = obj
                break
            else:
                return make_response(jsonify({'message': 'Incorrect Password'}),
                                     401)

    if user:
        login_user(user)
        token = jwt.encode(
                    {'user_id': user.id, 'user_type': login_type},
                    current_app.config['SECRET_KEY'],
                    algorithm='HS256')

        response = make_response(jsonify({'message': 'Login successful',
                                          'user': user.to_dict(),
                                          'type': login_type}), 200)
        response.set_cookie('token', token, httponly=False)
        return response
    else:
        return make_response(jsonify({'message': 'user not found'}), 404)


@auth.route('/logout')
@login_required
def logout():
    """ Log the user out """

    logout_user()

    response = jsonify({'message': 'Logout successful'})
    response.delete_cookie('token')
    return response


@auth.route('/auth_status')
def auth_status():
    """ Checks the authentication status """

    if current_user.is_authenticated:
        return jsonify({'authenticated': True, 'user': current_user.to_dict()})
    else:
        return jsonify({'authenticated': False})
