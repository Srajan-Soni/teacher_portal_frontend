import React,{useContext, useState} from 'react';
import { Input, Button, Typography, Space, message } from 'antd';
import { UnlockFilled, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../API/apiRoutes';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const {login,setTeacherId} = useContext(AuthContext)

  const handleLogin = async () => {
    if (!email || !password) {
      message.error('Please fill in both fields.');
      return;
    }
  
    try {
      const response = await axios.post(LOGIN, { email, password });
      message.success('Login successful');
      const { token, teacherId } = response.data;
      console.log(teacherId);
      
      localStorage.setItem('token', token);
      localStorage.setItem('teacherId', teacherId); 
      setTeacherId(teacherId)
      login()
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      message.error('Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="flex flex-col  items-center min-h-screen bg-gray-100">
      <h1  className="text-red-500 text-4xl mt-20 mb-10">
        Tailwebs
      </h1>
      <div className="w-full max-w-lg p-20 mt-10 bg-white shadow-md rounded-sm">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input
            size="large"
            placeholder="Enter your Email"
            prefix={<UserOutlined />}
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <Input
            size="large"
            placeholder="Enter your password"
            prefix={<UnlockFilled />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
           
            size="large"
            className="mt-4 bg-black text-white"
            block
            danger
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to='/signup' className='mt-2 '>create account</Link>
        </Space>
      </div>
    </div>
  );
};

export default Login;
