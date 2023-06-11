#!/usr/bin/python3
""" Courses route for database """
from models.department import Department
from models import storage
from api.views import app_views
from flask import abort, jsonify, make_response, request
# from flasgger.utils import swag_from


@app_views.route(
        '/departments/<department_id>/courses',
        methods=['GET', 'POST'],
        strict_slashes=False)
def courses(department_id):
    """
        Configures GET and POST methods for the courses route
    """

    if request.method == 'GET':
        department = storage.get('Department', department_id)
        list_courses = [course.to_dict() for course in department.courses]
        return jsonify(list_courses)
    else:
        if not request.get_json():
            abort(400, description="Not a valid JSON dict")
        required = ['name',
                    'level',
                    'course_id',
                    'teacher_id']
        if 'name' not in request.get_json():
            abort(400,
                    description="Missing required parameter: name")

        data = request.get_json()
        instance = Department(**data)
        instance.department_id = department_id
        storage.new(instance)
        storage.save()
        return make_response(jsonify(instance.to_dict()), 201)


@app_views.route(
        '/departments/<department_id>/courses/<course_id>',
        methods=['GET', 'PUT', 'DELETE'],
        strict_slashes=False)
def course(department_id, course_id):
    """
        Configures GET, PUT and DELETE for the course route
    """

    department = storage.get('Department', department_id)
    course = storage.get('Course', course_id)
    if not department or not course:
        abort(404)

    if request.method == 'GET':
        return jsonify(course.to_dict())
    elif request.method == 'PUT':
        if not request.get_json():
            abort(400, description="Not a valid JSON")

        ignore = ['id', 'created_at']
        data = request.get_json()
        for key, value in data.items():
            if key not in ignore:
                setattr(course, key, value)

        storage.save()
        return make_response(jsonify(course.to_dict()), 200)
    else:
        storage.delete(course)
        storage.save()
        return make_response(jsonify({}), 200)
