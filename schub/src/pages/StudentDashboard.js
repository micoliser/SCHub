import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

function StudentDashboard () {
  const { isLoggedIn, user } = useContext(AuthContext);

  return isLoggedIn
    ? (
      <h1>Welcome {user.first_name}</h1>
      )
    : (
      <Navigate replace to='/login' />
      );
}
export default StudentDashboard;
