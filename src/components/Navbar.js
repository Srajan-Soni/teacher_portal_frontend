import { Button, Flex, message } from "antd";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const navigate = useNavigate()

  const {isLoggedIn,logout} = useContext(AuthContext)

 console.log(isLoggedIn);
 

 
  return (
    <div className="min-h-[50px] flex justify-between items-center shadow-sm shadow-slate-700">
      <h1 className="text-red-500 text-xl font-bold ml-5">Tailwebs</h1>

      <Flex wrap gap="small" className="mr-2">
        {
          isLoggedIn ? 
          <> 
          <Button danger className="bg-black">
            <Link to="/dashboard">Home</Link>
          
        </Button>
        <Button onClick={logout} danger className="bg-black">
            <Link to="/">Logout</Link>
          
        </Button>
          </>
          :  
          <Button danger className="bg-black"><Link to="/">Login</Link></Button>
        }
       
       
      
      </Flex>
    </div>
  );
};

export default Navbar;
