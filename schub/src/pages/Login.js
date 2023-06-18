import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';
import Button from '../components/Button';
import { Navigate } from 'react-router-dom';
import '../styles/login.css';

function Login () {
  const [startLogin, setStartLogin] = useState(false);
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login, user } = useContext(AuthContext);

  async function handleLogin (e) {
    e.preventDefault();
    axios
      .post(
        'http://localhost:5000/auth/login',
        { type, email, password },
        { withCredentials: true }
      )
      .then((res) => {
        const data = res.data;
        login(data.user);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
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
      <Navigate replace to={`/${user.type.toLowerCase()}-dashboard`} />
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
