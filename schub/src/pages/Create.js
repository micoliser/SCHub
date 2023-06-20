import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Input from '../components/Input';
import '../styles/create.css';

function CreateNew ({ type }) {
  const [departments, setDepartments] = useState([]);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [matricNo, setMatricNo] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  useEffect(() => {
    // fetch departments
    axios
      .get('http://localhost:5000/api/departments')
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function createNew (e) {
    e.preventDefault();
    const data = {
      first_name: fName,
      last_name: lName,
      email: email,
      department_id: departmentId
    };
    let url;

    if (type === 'student') {
      data.age = age;
      data.start_level = level;
      data.current_level = level;
      data.matric_no = matricNo;

      url = 'http://localhost:5000/api/students';
    } else {
      url = 'http://localhost:5000/api/teachers';
    }

    axios
      .post(url, data, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log('Error:', err));

    clearForm();
  }

  function clearForm () {
    setFName('');
    setLName('');
    setEmail('');
    setAge('');
    setLevel('');
    setMatricNo('');
    setDepartmentId('');
  }

  return (
    <div>
      <Form onSubmit={createNew} className='create'>
        <h3>Register new student</h3>
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
              type='number'
              name='level'
              placeholder='Enter level'
              value={level}
              onChange={(e) => setLevel(e.target.value)}
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
            <select
              onChange={(e) => {
                setDepartmentId(
                  e.target.options[e.target.selectedIndex].getAttribute('id')
                );
              }}
            >
              {departments.map((department) => (
                <option key={department.id} id={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <br />
          </>
        )}
        <Input type='submit' name='create' />
      </Form>
    </div>
  );
}

export default CreateNew;
