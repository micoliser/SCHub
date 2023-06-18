import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";

function StudentDashboard({ loading }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [department, setDepartment] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user) {
      // fetch department of student
      axios
        .get(`http://localhost:5000/api/departments/${user.department_id}`)
        .then((res) => {
          setDepartment(res.data);
        })
        .catch((err) => {
          console.log("Error:", err);
        });

      // fetch courses of student
      axios
        .get(
          `http://localhost:5000/api/departments/${user.department_id}/courses`
        )
        .then((res) => {
          setAllCourses(res.data);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (allCourses.length > 0) {
      const filteredCourses = allCourses.filter(
        (course) => course.level === user.current_level
      );
      setFilteredCourses(filteredCourses);
      setCourses(filteredCourses);
    }
  }, [allCourses, user.current_level]);

  function showAll() {
    if (show) {
      setCourses(filteredCourses);
      setShow(false);
    } else {
      setCourses(allCourses);
      setShow(true);
    }
  }

  return loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : isLoggedIn ? (
    <section>
      <h1>Welcome {user.first_name}</h1>
      <div>
        <p>
          <span>Matric No: </span>
          {user.matric_no}
        </p>
        <p>
          <span>Full Name: </span>
          {user.first_name + " " + user.last_name}
        </p>
        <p>
          <span>Email: </span>
          {user.email}
        </p>
        <p>
          <span>Level: </span>
          {user.current_level + "00"}
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
                <li key={course.id}>
                  {course.name} ({course.level}00L)
                </li>
              ))}
            </ul>
            <Button name="more-courses" onClick={showAll}>
              {show
                ? "Show courses for current level"
                : "Show courses for all levels"}
            </Button>
          </>
        )}
      </div>
    </section>
  ) : (
    <Navigate replace to="/login" />
  );
}

export default StudentDashboard;
