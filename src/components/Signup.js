import React,{useState} from 'react';
import { Input, Button, Typography, Space,message } from 'antd';
import { UnlockFilled, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNUP } from '../API/apiRoutes';
import axios from 'axios';

const Signup = () => {


    const [email, setemail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const errors = {};
        if (!email) errors.email = "Email is required";
        if (!username) errors.username = "Username is required";
        if (!password) errors.password = "Password is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
      };
      const handleSubmit = async() => {
      
        if (validateForm()) {
      
            try {

                const response = await axios.post(SIGNUP,{username,email,password});

                const data = await response.data;
                console.log(response);
                
                if(data){
                    localStorage.setItem("token",data.token);
                     message.success('Sign up successful!');
                     console.log({ email, username, password });
                     navigate("/")
                }

            } catch (error) {
                console.log(error);
                message.error('Registration failed');
                
            }
          
        } else {
          message.error('Please fix the errors in the form');
        }
      };    

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-red-500 text-4xl mt-20 mb-10">
        Tailwebs
      </h1>
      <div className="w-full max-w-lg p-10 mt-10 bg-white shadow-md rounded-sm">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input
            size="large"
            placeholder="Enter your Email"
            prefix={<MailOutlined />}
            value={email}
            onChange={(e)=> setemail(e.target.value)}
            status={errors.email ? 'error' : ''}
            help={errors.email}
          />
          <Input
            size="large"
            placeholder="Enter your Username"
            prefix={<UserOutlined />}
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            status={errors.username ? 'error' : ''}
            help={errors.username}
          />
          <Input
            size="large"
            placeholder="Enter your Password"
            prefix={<UnlockFilled />}
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            status={errors.password ? 'error' : ''}
            help={errors.password}
          />
        
          <Button
            size="large"
            className="mt-4 bg-black text-white"
            block
            onClick={handleSubmit}
            danger
          >
            Sign Up
          </Button>
          <Link to='/' className='mt-2 text-blue-500 '>
            Already have an account? Log in
          </Link>
        </Space>
      </div>
    </div>
  );
};

export default Signup;
