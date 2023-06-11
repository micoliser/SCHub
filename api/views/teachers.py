#!/usr/bin/python3
""" Teachers route for database """
from models.teacher import Teacher
from models import storage
from api.views import app_views
from flask import abort, jsonify, make_response, request
# from flasgger.utils import swag_from


@app_views.route(
        '/teachers',
        methods=['GET', 'POST'],
        strict_slashes=False)
def teachers():
    """
        Configures GET and POST methods for the teachers route
    """

    if request.method == 'GET':
        all_teachers = storage.all('Teacher').values()
        list_teachers = [teacher.to_dict() for teacher in all_teachers]
        return jsonify(list_teachers)
    else:
        if not request.get_json():
            abort(400, description="Not a valid JSON dict")
        required = ['first_name',
                    'last_name',
                    'department_id',
                    'email',
                    'password']
        for parameter in required:
            if parameter not in request.get_json():
                abort(400,
                      description="Missing required parameter: {}".format(
                                                                   parameter))

        data = request.get_json()
        instance = Teacher(**data)
        storage.new(instance)
        storage.save()
        return make_response(jsonify(instance.to_dict()), 201)


@app_views.route(
        '/teachers/<teacher_id>',
        methods=['GET', 'PUT', 'DELETE'],
        strict_slashes=False)
def teacher(teacher_id):
    """
        Configures GET, PUT and DELETE for the teacher route
    """

    teacher = storage.get('Teacher', teacher_id)
    if not teacher:
        abort(404)

    if request.method == 'GET':
        return jsonify(teacher.to_dict())
    elif request.method == 'PUT':
        if not request.get_json():
            abort(400, description="Not a valid JSON")

        ignore = ['id', 'created_at']
        data = request.get_json()
        for key, value in data.items():
            if key not in ignore:
                setattr(teacher, key, value)

        storage.save()
        return make_response(jsonify(teacher.to_dict()), 200)
    else:
        storage.delete(teacher)
        storage.save()
        return make_response(jsonify({}), 200)
