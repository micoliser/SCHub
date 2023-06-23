import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import '../styles/updateform.css';

function UpdateForm({ type, name, id, department, setUpdating, setUpdate }) {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [cName, setCName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (type === 'course') {
      axios
        .get('http://localhost:5000/api/teachers')
        .then((res) => {
          const allTeachers = res.data;
          setTeachers(
            allTeachers.filter((teacher) => teacher.department === department)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [type, department]);

  function doUpdate(e) {
    e.preventDefault();
    const data = {};
    if (fName) data.first_name = fName;
    if (lName) data.last_name = lName;
    if (cName) data.name = cName;
    if (teacherId) data.teacher_id = teacherId;
    if (email) data.email = email;
    if (age) data.age = age;

    axios
      .put(`http://localhost:5000/api/${type}s/${id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        backFromUpdate();
      })
      .catch((err) => console.log('Error:', err));
  }

  function backFromUpdate() {
    setUpdating(false);
    if (type === 'course') setUpdate({ id: '', name: '', department: '' });
    else setUpdate({ id: '', name: '' });
    setFName('');
    setLName('');
    setCName('');
    setTeacherId('');
    setEmail('');
    setAge('');
  }

  return (
    <Form className='update' onSubmit={doUpdate}>
      <h3>Updating {name}</h3>
      <p>Only fill the details you want to update</p>
      {(type === 'student' || type === 'teacher') && (
        <>
          <Input
            type='text'
            name='fName'
            placeholder='First name'
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          <br />
          <Input
            type='text'
            name='lName'
            placeholder='Last name'
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <br />
          <Input
            type='email'
            name='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        </>
      )}
      {(type === 'course' || type === 'department') && (
        <>
          <Input
            type='text'
            name='cName'
            placeholder={`Enter ${type} name`}
            value={cName}
            onChange={(e) => setCName(e.target.value)}
          />
          <br />
          {teachers.length !== 0 && (
            <>
              <p className='change'>Change Teacher</p>
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
        </>
      )}
      <Button name='back' onClick={backFromUpdate}>
        Go back
      </Button>
      <Input type='submit' name='Update' value='Update' />
    </Form>
  );
}

export default UpdateForm;
