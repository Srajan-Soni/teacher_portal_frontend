import React from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGOUT } from '../API/apiRoutes'; // Update this path to your actual API routes file

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT);
      localStorage.removeItem('token');
      message.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
      message.error('Logout failed. Please try again.');
    }
  };

  return (
    <Button onClick={handleLogout} danger>
      Logout
    </Button>
  );
};

export default Logout;
