import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import Button from "../components/Button";
import "../styles/mstudents.css";

function StudentManager({ loading }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchingValue, setSearchingValue] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [filteringLevel, setFilteringLevel] = useState({
    active: false,
    value: "",
  });
  const [filteringDepartment, setFilteringDepartment] = useState({
    active: false,
    value: "",
  });
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [numberShown, setNumberShown] = useState(100);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students", { withCredentials: true })
      .then((res) => {
        setAllStudents(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });

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

  function handleUpdate(e) {}

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
    setDeleting(false);
    setDeleteId("");
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
        <h1>Students</h1>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Search student by name or matric number"
            value={searchingValue}
            onChange={(e) => setSearchingValue(e.target.value)}
          />
          <Button name="search-students" text="Search" click={handleSearch} />
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
              <Button name="show" text="Show All" click={showAll} />
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
                      text="Update"
                      click={handleUpdate}
                      className="update"
                    />
                  </td>
                  <td>
                    {deleting && deleteId === student.id ? (
                      <div className="deleting">
                        <p>
                          Are you sure you want to delete {student.first_name}?
                        </p>
                        <Button
                          name="back"
                          text="No, Go Back"
                          click={backFromDelete}
                          className="back"
                        />
                        <Button
                          name="delete"
                          text="Yes, Delete"
                          click={doDelete}
                          className="delete"
                        />
                      </div>
                    ) : (
                      <Button
                        name={student.id}
                        text="Delete"
                        click={handleDelete}
                        className="delete"
                      />
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
            <Button
              className="more"
              name="view"
              text="View More"
              click={viewMore}
            />
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
