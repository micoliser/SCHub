import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function TeacherDashboard ({ loading }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [department, setDepartment] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user) {
      // fetch department of teacher
      axios
        .get(`http://localhost:5000/api/departments/${user.department_id}`)
        .then((res) => {
          setDepartment(res.data);
        })
        .catch((err) => {
          console.log('Error:', err);
        });

      // fetch courses of teacher
      axios
        .get(`http://localhost:5000/api/teachers/${user.id}/courses`)
        .then((res) => {
          console.log(res.data);
          setCourses(res.data);
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    }
  }, [user]);

  return loading
    ? (
      <div>
        <h2>Loading...</h2>
      </div>
      )
    : isLoggedIn
      ? (
        <section>
          <h1>Welcome {user.first_name}</h1>
          <div>
            <p>
              <span>Full Name: </span>
              {user.first_name + ' ' + user.last_name}
            </p>
            <p>
              <span>Email: </span>
              {user.email}
            </p>
            {department && (
              <p>
                <span>Department: </span>
                {department.name}
              </p>
            )}
            {courses.length !== 0 && (
              <>
                <p>Courses: </p>
                <ul>
                  {courses.map((course) => (
                    <li key={course.id}>{course.name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
        )
      : (
        <Navigate replace to='/login' />
        );
}
export default TeacherDashboard;
