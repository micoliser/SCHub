import { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import UpdateForm from '../components/UpdateForm';
import Input from '../components/Input';
import Button from '../components/Button';
import DisplayTable from '../components/DisplayTable';
import '../styles/manage.css';
import LoadingPage from '../components/Loading';

function CourseManager({ loading }) {
  // auth context values
  const { isLoggedIn, user } = useContext(AuthContext);

  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [filteringLevel, setFilteringLevel] = useState({
    active: false,
    value: '',
  });
  const [filteringDepartment, setFilteringDepartment] = useState({
    active: false,
    value: '',
  });

  const [updating, setUpdating] = useState(false);
  const [updateCourse, setUpdateCourse] = useState({
    id: '',
    name: '',
    department: '',
  });

  const [searching, setSearching] = useState(false);
  const [searchingValue, setSearchingValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  // states for search error
  const [searchError, setSearchError] = useState({ active: false });

  useEffect(() => {
    // fetch all courses
    axios
      .get('http://localhost:5000/api/courses', { withCredentials: true })
      .then((res) => {
        setAllCourses(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });

    // fetch all departments
    axios
      .get('http://localhost:5000/api/departments', { withCredentials: true })
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  function handleSearch() {
    if (searchingValue.length < 3) {
      return;
    }
    setSearching(true);
    setCourses(
      allCourses.filter((course) => {
        return course.name.toLowerCase().includes(searchingValue.toLowerCase());
      })
    );
    setSearchedValue(searchingValue);
    setSearchingValue('');
  }

  function handleFilter(e) {
    setSearching(false);
    setSearchError({ active: false });
    setSearchedValue('');
    setSearchingValue('');

    const value = e.target.value;
    if (e.target.name === 'filter-level') {
      if (filteringDepartment.active) {
        setCourses(
          allCourses.filter(
            (course) =>
              course.level === Number(value) / 100 &&
              course.department === filteringDepartment.value
          )
        );
      } else {
        setCourses(
          allCourses.filter((course) => course.level === Number(value) / 100)
        );
      }
      setFilteringLevel({ active: true, value: value });
    } else {
      if (filteringLevel.active) {
        setCourses(
          allCourses.filter(
            (course) =>
              course.department === value &&
              course.level === filteringLevel.value / 100
          )
        );
      } else {
        setCourses(allCourses.filter((course) => course.department === value));
      }
      setFilteringDepartment({ active: true, value: value });
    }
  }

  function handleUpdate(id, name, department) {
    setUpdating(true);
    setUpdateCourse({ id: id, name: name, department: department });
  }

  function showAll() {
    setCourses(allCourses);
    setSearching(false);
    setSearchError({ active: false });
    setSearchedValue('');
    setSearchingValue('');
  }

  return loading ? (
    <LoadingPage />
  ) : isLoggedIn ? (
    user.type === 'Admin' ? (
      <section className='manage'>
        {updating ? (
          <UpdateForm
            type='course'
            name={updateCourse.name}
            id={updateCourse.id}
            department={updateCourse.department}
            setUpdating={setUpdating}
            setUpdate={setUpdateCourse}
          />
        ) : (
          <>
            <h1>Courses</h1>
            <Link to='/admin-dashboard/courses/new'>Register New Course</Link>
            <div className='search'>
              <Input
                type='text'
                name='search'
                placeholder='Search course by name'
                value={searchingValue}
                onChange={(e) => {
                  setSearchingValue(e.target.value);
                  if (searchingValue.length < 3) {
                    setSearchError({
                      active: true,
                      message: 'search word must be 3 characters or more',
                    });
                  } else {
                    setSearchError({ active: false });
                  }
                }}
                error={searchError}
              />
              <Button name='search-courses' onClick={handleSearch}>
                Search
              </Button>
            </div>
            <div className='filter'>
              <h3>Filter</h3>
              <div className='filters'>
                <div className='level'>
                  <p>By Level</p>
                  <select name='filter-level' onChange={handleFilter}>
                    <option>100</option>
                    <option>200</option>
                    <option>300</option>
                    <option>400</option>
                  </select>
                </div>
                <div className='department'>
                  <p>By Department</p>
                  <select name='filter-departments' onChange={handleFilter}>
                    {departments.map((department) => (
                      <option key={department.id}>{department.name}</option>
                    ))}
                  </select>
                </div>
                <div className='all'>
                  <Button name='show' onClick={showAll}>
                    Show All
                  </Button>
                </div>
              </div>
            </div>
            {searching && <p>Showing search results for {searchedValue}</p>}
            <DisplayTable
              type='course'
              data={courses}
              setData={setCourses}
              allData={allCourses}
              setAllData={setAllCourses}
              handleUpdate={handleUpdate}
              searching={searching}
              searchedValue={searchedValue}
            />
          </>
        )}
      </section>
    ) : (
      <Navigate replace to={`/${user.type.toLowerCase()}-dashboard`} />
    )
  ) : (
    <Navigate replace to='/login' />
  );
}

export default CourseManager;
