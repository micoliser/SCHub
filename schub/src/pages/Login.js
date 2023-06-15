import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import Button from '../components/Button';
import { Navigate } from 'react-router-dom';

function Login () {
  const [startLogin, setStartLogin] = useState(false);
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login } = useContext(AuthContext);

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

  function handleStartLogin (e) {
    if (startLogin) {
      setStartLogin(false);
      setType('');
      setEmail('');
      setPassword('');
    } else {
      setStartLogin(true);
      setType(e.target.name);
    }
  }

  return isLoggedIn
    ? (
      <Navigate replace to={`/${type.toLowerCase()}-dashboard`} />
      )
    : (
      <div className='form-container'>
        {startLogin
          ? (
            <div className='login-container'>
              <Button
                name={type}
                click={handleStartLogin}
                text={`Login as ${type}`}
              />
              <form className='login-form' onSubmit={handleLogin}>
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
            )
          : (
            <div className='login-container'>
              <Button
                name='Student'
                click={handleStartLogin}
                text='Login as Student'
              />
              <br />
              <Button
                name='Teacher'
                click={handleStartLogin}
                text='Login as Teacher'
              />
              <br />
              <Button
                name='Admin'
                click={handleStartLogin}
                text=' Login as Admin'
              />
              <br />
            </div>
            )}
      </div>
      );
}

export default Login;
