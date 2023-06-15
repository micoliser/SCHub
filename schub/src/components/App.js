import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import NotFound from '../pages/NotFound';
import { AuthContext } from './AuthContext';

function App () {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('http://localhost:5000/auth/auth_status', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) login(data.user);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='admin-dashboard' element={<AdminDashboard />} />
          <Route path='teacher-dashboard' element={<TeacherDashboard />} />
          <Route path='student-dashboard' element={<StudentDashboard />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
