import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/admin.css';

function AdminDashboard ({ loading }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  return loading
    ? (
      <div>
        <h2>Loading...</h2>
      </div>
      )
    : isLoggedIn
      ? (
        <section className='admin-dashboard'>
          <h1>Welcome {user.first_name}</h1>
          <p>What would you like to do today?</p>
          <Link to='/admin-dashboard/students'>Manage Students</Link>
          <br />
          <Link to='/teachers'>Manage Teachers</Link>
          <br />
          <Link to='/courses'>Manage Courses</Link>
          <br />
          <Link to='/departments'>Manage Departments</Link>
          <br />
        </section>
        )
      : (
        <Navigate replace to='/login' />
        );
}
export default AdminDashboard;
