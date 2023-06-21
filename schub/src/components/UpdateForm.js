import { useState } from 'react';
import axios from 'axios';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import '../styles/updateform.css';

function UpdateForm({ type, name, id, setUpdating, setUpdateStudent }) {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  function doUpdate(e) {
    e.preventDefault();
    const data = {};
    if (fName) data.first_name = fName;
    if (lName) data.last_name = lName;
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
    setUpdateStudent({ id: '', name: '' });
    setFName('');
    setLName('');
    setEmail('');
    setAge('');
  }

  return (
    <Form className='update' onSubmit={doUpdate}>
      <h3>Updating {name}</h3>
      <p>Only fill the details you want to update</p>
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
      {type === 'student' && (
        <>
          {' '}
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
      <Button name='back' onClick={backFromUpdate}>
        Go back
      </Button>
      <Input type='submit' name='Update' value='Update' />
    </Form>
  );
}

export default UpdateForm;
