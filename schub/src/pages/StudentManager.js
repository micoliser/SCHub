import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/mstudents.css";

function StudentManager({ loading }) {
  // auth context values
  const { isLoggedIn, user } = useContext(AuthContext);

  // states for initial students and department render
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [numberShown, setNumberShown] = useState(100);

  // states for students search functionality
  const [searching, setSearching] = useState(false);
  const [searchingValue, setSearchingValue] = useState("");
  const [searchedValue, setSearchedValue] = useState("");

  // states for students filter functionality
  const [filteringLevel, setFilteringLevel] = useState({
    active: false,
    value: "",
  });
  const [filteringDepartment, setFilteringDepartment] = useState({
    active: false,
    value: "",
  });

  // states for student update functionality
  const [updating, setUpdating] = useState(false);
  const [updateStudent, setUpdateStudent] = useState({ id: "", name: "" });
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // states for student delete functionality
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    // fetch all students
    axios
      .get("http://localhost:5000/api/students", { withCredentials: true })
      .then((res) => {
        setAllStudents(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    // fetch all departments
    axios
      .get("http://localhost:5000/api/departments", { withCredentials: true })
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  useEffect(() => {
    // to only display the first 100 students on load
    if (allStudents.length > 0) {
      const filteredStudents = allStudents.filter((student, i) => i < 100);
      setStudents(filteredStudents);
    }
  }, [allStudents]);

  function viewMore() {
    setStudents(allStudents.filter((student, i) => i < 100 + numberShown));
    setNumberShown(numberShown + 100);
  }

  function handleFilter(e) {
    setSearching(false);
    const value = e.target.value;
    if (e.target.name === "filter-level") {
      if (filteringDepartment.active) {
        setStudents(
          allStudents.filter(
            (student) =>
              student.current_level === Number(value) / 100 &&
              student.department === filteringDepartment.value
          )
        );
      } else {
        setStudents(
          allStudents.filter(
            (student) => student.current_level === Number(value) / 100
          )
        );
      }
      setFilteringLevel({ active: true, value: value });
    } else {
      if (filteringLevel.active) {
        setStudents(
          allStudents.filter(
            (student) =>
              student.department === value &&
              student.current_level === filteringLevel.value / 100
          )
        );
      } else {
        setStudents(
          allStudents.filter((student) => student.department === value)
        );
      }
      setFilteringDepartment({ active: true, value: value });
    }
  }

  function handleSearch() {
    if (searchingValue.length < 3) {
      return;
    }
    setSearching(true);
    setStudents(
      allStudents.filter((student) => {
        const fullName = student.first_name + " " + student.last_name;
        return (
          fullName.toLowerCase().includes(searchingValue.toLowerCase()) ||
          student.matric_no.toLowerCase().includes(searchingValue.toLowerCase())
        );
      })
    );
    setSearchedValue(searchingValue);
    setSearchingValue("");
  }

  function showAll() {
    setStudents(allStudents.filter((student, i) => i < 100));
    setNumberShown(100);
    setFilteringLevel({ active: false, value: "" });
    setFilteringDepartment({ active: false, value: "" });
    setSearching(false);
  }

  function handleUpdate(id, name) {
    setUpdating(true);
    setUpdateStudent({ id: id, name: name });
  }

  function doUpdate(e) {
    e.preventDefault();
    const data = {};
    if (fName) data.first_name = fName;
    if (lName) data.last_name = lName;
    if (email) data.email = email;
    if (age) data.age = age;

    axios
      .put(`http://localhost:5000/api/students/${updateStudent.id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.ok) backFromUpdate();
      })
      .catch((err) => console.log("Error:", err));
  }

  function backFromUpdate() {
    setUpdating(false);
    setUpdateStudent({ id: "", name: "" });
    setFName("");
    setLName("");
    setEmail("");
    setAge("");
  }

  function handleDelete(e) {
    setDeleting(true);
    setDeleteId(e.target.name);
  }

  function doDelete(e) {
    const id = deleteId;
    setAllStudents(allStudents.filter((student) => student.id !== id));
    axios
      .delete(`http://localhost:5000/api/students/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log("Error:", err));
    backFromDelete();
  }

  function backFromDelete() {
    setDeleting(false);
    setDeleteId("");
  }

  return loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : isLoggedIn ? (
    user.type === "Admin" ? (
      <section className="manage-students">
        {updating ? (
          <Form className="update" onSubmit={doUpdate}>
            <h3>Updating {updateStudent.name}</h3>
            <p>Only fill the details you want to update</p>
            <Input
              type="text"
              name="fName"
              placeholder="First name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
            <br />
            <Input
              type="text"
              name="lName"
              placeholder="Last name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
            <br />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              type="number"
              name="age"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <Button name="back" onClick={backFromUpdate}>
              Go back
            </Button>
            <Input type="submit" name="Update" value="Update" />
          </Form>
        ) : (
          <>
            <h1>Students</h1>
            <Link to="/admin-dashboard/students/new">Create New</Link>
            <div className="search">
              <Input
                type="text"
                name="search"
                placeholder="Search student by name or matric number"
                value={searchingValue}
                onChange={(e) => setSearchingValue(e.target.value)}
              />
              <Button name="search-students" onClick={handleSearch}>
                Search
              </Button>
            </div>
            <div className="filter">
              <h3>Filter</h3>
              <div className="filters">
                <div className="level">
                  <h4>By Level</h4>
                  <select name="filter-level" onChange={handleFilter}>
                    <option>100</option>
                    <option>200</option>
                    <option>300</option>
                    <option>400</option>
                  </select>
                </div>
                <div className="department">
                  <h4>By Department</h4>
                  <select name="filter-departments" onChange={handleFilter}>
                    {departments.map((department) => (
                      <option key={department.id}>{department.name}</option>
                    ))}
                  </select>
                </div>
                <div className="all">
                  <Button name="show" onClick={showAll}>
                    Show All
                  </Button>
                </div>
              </div>
            </div>
            {searching && <p>Showing search results for {searchedValue}</p>}
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Matric No</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Level</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  return (
                    <tr key={student.id}>
                      <td>{student.first_name + " " + student.last_name}</td>
                      <td>{student.matric_no}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td>{student.current_level + "00"}</td>
                      <td>
                        <Button
                          name={student.id}
                          onClick={() =>
                            handleUpdate(
                              student.id,
                              `${student.first_name} ${student.last_name}`
                            )
                          }
                          className="update"
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        {deleting && deleteId === student.id ? (
                          <div className="deleting">
                            <p>
                              Are you sure you want to delete{" "}
                              {student.first_name}?
                            </p>
                            <Button
                              name="back"
                              onClick={backFromDelete}
                              className="back"
                            >
                              No, Go Back
                            </Button>
                            <Button
                              name="delete"
                              onClick={doDelete}
                              className="delete"
                            >
                              Yes, Delete
                            </Button>
                          </div>
                        ) : (
                          <Button
                            name={student.id}
                            onClick={handleDelete}
                            className="delete"
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {students.length < allStudents.length &&
              !filteringDepartment.active &&
              !filteringLevel.active &&
              !searching && (
                <Button className="more" name="view" onClick={viewMore}>
                  View More
                </Button>
              )}
          </>
        )}
      </section>
    ) : (
      <Navigate replace to={`/${user.type.toLowerCase()}-dashboard`} />
    )
  ) : (
    <Navigate replace to="/login" />
  );
}

export default StudentManager;
