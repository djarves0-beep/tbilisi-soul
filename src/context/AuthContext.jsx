import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('user'); // 'user' или 'admin'

  const loginAsAdmin = (password) => {
    if (password === 'admin123') {
      setRole('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setRole('user');
  };

  return (
    <AuthContext.Provider value={{ role, loginAsAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);