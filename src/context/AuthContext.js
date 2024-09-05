
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teacherId, setTeacherId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedTeacherId = localStorage.getItem('teacherId');  
    if (token) {
      setIsLoggedIn(true);
      setTeacherId(storedTeacherId);  
    } else {
      setIsLoggedIn(false);
      setTeacherId(null);
    }
  }, []);
  

  const login = () => {
    setIsLoggedIn(true);
   
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacherId');
    setIsLoggedIn(false);
    setTeacherId(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, teacherId,setTeacherId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
