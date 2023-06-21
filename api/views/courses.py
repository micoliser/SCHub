#!/usr/bin/python3
""" Courses route for database """
from models.course import Course
from models import storage
from api.views import app_views
from flask import abort, jsonify, make_response, request
# from flasgger.utils import swag_from


@app_views.route(
    '/courses',
    methods=['GET', 'POST'],
    strict_slashes=False)
def allCourses():
    """
        Configures GET and POST methods for the courses route
    """

    if request.method == 'GET':
        level = request.args.get('level')
        all_courses = storage.all('Course').values()
        if level is None:
            list_courses = [course.to_dict() for course in all_courses]
        else:
            list_courses = []
            for course in all_courses:
                if course.level == int(level):
                    list_courses.append(course.to_dict())
        return jsonify(list_courses)
    else:
        if not request.get_json():
            abort(400, description="Not a valid JSON dict")
        required = ['name',
                    'level',
                    'course_id',
                    'teacher_id',
                    'department_id']
        for parameter in required:
            if parameter not in request.get_json():
                abort(400,
                      description="Missing required parameter: {}".format(
                          parameter))

        data = request.get_json()
        instance = Course(**data)
        storage.new(instance)
        storage.save()
        return make_response(jsonify(instance.to_dict()), 201)


@app_views.route(
    '/courses/<course_id>',
    methods=['GET', 'PUT', 'DELETE'],
    strict_slashes=False)
def oneCourse(course_id):
    """
        Configures GET, PUT and DELETE for the course route
    """

    course = storage.get('Course', course_id)
    if not course:
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

        storage.new(course)
        storage.save()
        return make_response(jsonify(course.to_dict()), 200)
    else:
        storage.delete(course)
        storage.save()
        return make_response(jsonify({}), 200)


@app_views.route(
    '/courses/<course_id>/teacher',
    methods=['GET'],
    strict_slashes=False)
def course_teacher(course_id):
    """
        Configures GET and POST methods for the course/<id>/courses route
    """

    course = storage.get('Course', course_id)
    teacher = storage.get('Teacher', course.teacher_id)
    return jsonify(teacher.to_dict())
