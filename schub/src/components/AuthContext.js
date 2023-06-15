import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    console.log(userData);
    setUser(userData);
    setType(userData.type);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setType(null);
  };

  const authContextValue = {
    isLoggedIn,
    user,
    type,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
