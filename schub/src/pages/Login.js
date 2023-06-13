import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';

function Login () {
  const [type, setType] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  async function handleLogin (e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, email, password }),
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        login(data.user);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='form-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <p>Login as: </p>
        <select
          name='type'
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Student</option>
          <option>Teacher</option>
          <option>Admin</option>
        </select>
        <br />
        <h3>Login as {type}</h3>
        <input
          type='text'
          name='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type='submit' value='Login' />
        <br />
      </form>
    </div>
  );
}

export default Login;
