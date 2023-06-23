import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Form from '../components/Form';
import Input from '../components/Input';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/create.css';

function CreateNew({ type }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [departments, setDepartments] = useState([]);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [name, setName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [matricNo, setMatricNo] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  useEffect(() => {
    if (type !== 'department') {
      // fetch departments
      axios
        .get('http://localhost:5000/api/departments')
        .then((res) => {
          setDepartments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [type]);

  function createNew(e) {
    e.preventDefault();
    const data = {};
    if (fName) data.first_name = fName;
    if (lName) data.last_name = lName;
    if (name) data.name = name;
    if (teacherId) data.teacher_id = teacherId;
    console.log(teacherId);
    if (email) data.email = email;
    if (age) data.age = age;
    if (level) {
      if (type === 'student') {
        data.start_level = level;
        data.current_level = level;
      } else {
        data.level = level;
      }
    }
    if (departmentId) data.department_id = departmentId;

    console.log(data);

    axios
      .post(`http://localhost:5000/api/${type}s`, data, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log('Error:', err));

    clearForm();
  }

  function clearForm() {
    setFName('');
    setLName('');
    setEmail('');
    setAge('');
    setLevel('');
    setMatricNo('');
    setDepartmentId('');
    setTeachers([]);
    setTeacherId('');
  }

  function handleDepartmentChange(e) {
    const id = e.target.options[e.target.selectedIndex].getAttribute('id');
    setDepartmentId(id);

    if (type === 'course') {
      // fetch teachers
      axios
        .get('http://localhost:5000/api/teachers')
        .then((res) => {
          const allTeachers = res.data;
          setTeachers(
            allTeachers.filter((teacher) => teacher.department_id === id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return isLoggedIn ? (
    user.type === 'Admin' ? (
      <div>
        <Form onSubmit={createNew} className='create'>
          <h3>Register new {type}</h3>
          {(type === 'student' || type === 'teacher') && (
            <>
              <Input
                type='text'
                name='fName'
                placeholder='Enter first name'
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
              <br />
              <Input
                type='text'
                name='lName'
                placeholder='Enter last name'
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
              <br />
              <Input
                type='email'
                name='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
            </>
          )}
          {(type === 'course' || type === 'department') && (
            <>
              <Input
                type='text'
                name='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
            </>
          )}
          {type === 'student' && (
            <>
              <Input
                type='number'
                name='age'
                placeholder='Enter age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <br />
              <Input
                type='text'
                name='matricNo'
                placeholder='Enter matric number'
                value={matricNo}
                onChange={(e) => setMatricNo(e.target.value)}
              />
              <br />
            </>
          )}
          {departments.length > 0 && (
            <>
              <p>Choose department:</p>
              <select onChange={handleDepartmentChange}>
                {departments.map((department) => (
                  <option key={department.id} id={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              <br />
            </>
          )}
          {(type === 'student' || type === 'course') && (
            <>
              <p>Level</p>
              <select onChange={(e) => setLevel(e.target.value)}>
                <option>100</option>
                <option>200</option>
                <option>300</option>
                <option>400</option>
              </select>
              <br />
            </>
          )}
          {teachers.length !== 0 && (
            <>
              <p className='change'>Select Teacher</p>
              <select
                onChange={(e) => {
                  setTeacherId(
                    e.target.options[e.target.selectedIndex].getAttribute(
                      'name'
                    )
                  );
                }}
              >
                {teachers.map((teacher) => (
                  <option key={teacher.id} name={teacher.id}>
                    {teacher.first_name + ' ' + teacher.last_name}
                  </option>
                ))}
              </select>
              <br />
            </>
          )}
          <Input type='submit' name='create' />
        </Form>
      </div>
    ) : (
      <Navigate replace to={`/${user.type.toLowerCase()}-dashboard`} />
    )
  ) : (
    <Navigate replace to='/login' />
  );
}

export default CreateNew;
