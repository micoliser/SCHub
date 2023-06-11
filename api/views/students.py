#!/usr/bin/python3
""" Students route for database """

from models.student import Student
from models import storage
from api.views import app_views
from flask import abort, jsonify, make_response, request
# from flasgger.utils import swag_from


@app_views.route(
        '/students',
        methods=['GET'],
        strict_slashes=False)
def getStudents():
    """
        Returns the list of students in the db
    """

    level = request.args.get('level')
    all_students = storage.all('Student').values()
    if level is None:
        list_students = [student.to_dict() for student in all_students]
    else:
        list_students = []
        for student in all_students:
            if student.current_level == int(level):
                list_students.append(student.to_dict())
    return jsonify(list_students)


@app_views.route(
        '/students/<student_id>',
        methods=['GET'],
        strict_slashes=False)
def getStudent(student_id):
    """
        Returns the student with the specific id
    """
    student = storage.get('Student', student_id)
    if not student:
        abort(404)

    return jsonify(student.to_dict())


@app_views.route(
        '/students/<student_id>',
        methods=['DELETE'],
        strict_slashes=False)
def expelStudent(student_id):
    """
        Yeetus a student from the DB
    """

    offender = storage.get('Student', student_id)
    if offender is None:
        abort(404)

    storage.delete(offender)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route(
        '/students',
        methods=['POST'],
        strict_slashes=False)
def newStudent():
    """
        Registers a new student
    """
    if not request.get_json():
        abort(400, description="Not a valid JSON dict")
    required = [
            'first_name',
            'last_name',
            'age',
            'matric_no',
            'department_id',
            'id',
            'created_at',
            'start_level',
            'current_level',
            'email',
            'password']
    for parameter in required:
        if parameter not in request.get_json():
            abort(
                    400,
                    description="Missing required parameter (name, age, \
start_level, current_level, matric_no, department_id, id, created_at, \
first_name, last_name, email, password)")

    data = request.get_json()
    instance = Student(**data)
    storage.new(instance)
    storage.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route(
        '/students/<student_id>',
        methods=['PUT'],
        strict_slashes=False)
def updateStudent(student_id):
    """ Updates student data """

    student = storage.get('Student', student_id)
    if not student:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a valid JSON")

    ignore = ['created_at', 'start_level']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(student, key, value)

    storage.save()
    return make_response(jsonify(student.to_dict()), 200)
