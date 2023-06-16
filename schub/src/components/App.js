import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import NotFound from '../pages/NotFound';
import { AuthContext } from './AuthContext';

function App () {
  const [isLoading, setIsLoading] = useState(true);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('http://localhost:5000/auth/auth_status', { withCredentials: true })
      .then((res) => {
        const data = res.data;
        if (data.authenticated) {
          login(data.user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route
            path='admin-dashboard'
            element={<AdminDashboard loading={isLoading} />}
          />
          <Route
            path='teacher-dashboard'
            element={<TeacherDashboard loading={isLoading} />}
          />
          <Route
            path='student-dashboard'
            element={<StudentDashboard loading={isLoading} />}
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
