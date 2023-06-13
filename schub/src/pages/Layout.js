import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

function Layout () {
  const { isLoggedIn, logout } = useContext(AuthContext);

  async function handleLogout () {
    try {
      const res = await fetch('http://localhost:5000/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        logout();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <header>
        <Link to='/' className='head'>
          SC Hub
        </Link>
        {isLoggedIn
          ? (
            <button onClick={handleLogout}>Logout</button>
            )
          : (
            <button>API {'{ }'}</button>
            )}
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
