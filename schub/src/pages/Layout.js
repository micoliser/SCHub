import { useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

function Layout () {
  const { isLoggedIn, logout, type } = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function handleLogout () {
    try {
      const res = await fetch('http://localhost:5000/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        logout();
        setIsLoggingIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoggedIn && isLoggingIn) setIsLoggingIn(false);

  return (
    <>
      <header>
        <Link to='/' className='head' onClick={() => setIsLoggingIn(false)}>
          SCHub
        </Link>
        {!isLoggingIn &&
          (isLoggedIn
            ? (
              <div className='sign-div'>
                <Link
                  to={`/${type.toLowerCase()}-dashboard`}
                  className='sign dash'
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className='sign'>
                  Logout
                </button>
              </div>
              )
            : (
              <Link
                to='/login'
                className='sign'
                onClick={() => setIsLoggingIn(true)}
              >
                Login
              </Link>
              ))}
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
