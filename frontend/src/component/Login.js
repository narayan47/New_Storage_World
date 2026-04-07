import React, { useEffect, useState } from "react";
import '../index.css';
import App from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login()
{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();

  // useEffect(()=>{
  //   axios.get("/api/login")
  //   .then(res=>navigate('/home'))
  //   .catch(err=>console.log("plase login to access nsw"))
  // },[])

  const Submit = (e) => {
  e.preventDefault();
  if (email.trim() === "" || password.trim() === "") {
    setError("Empty fields are not allowed");
    return; 
  }
  else{
      axios.post("/api/user/login",{email:email,password:password})
      .then(res=>{
        if(res.data.status===true)
              navigate('/home')
        })
      .catch(err=>setError(err.response.data.message));
}
  };
    return(
        <>

      <div className="flex items-center justify-center min-h-screen bg-blue-400">
  <div className="max-w-md md:max-w-2xl w-full mx-4 bg-white shadow-md rounded-xl overflow-hidden">
    <div className="p-8 ">
      <div className="flex items-center justify-center  font-semibold tracking-wide text-indigo-500 "><img src="profile4.jpeg" className="rounded-full w-12 m-3"/>Login</div> 
    <form className="text-center"  onSubmit={Submit}>
        <span>{error}</span>
         <input type="email" className="border border-black-500 rounded px-2 py-1  mt-2  w-full " placeholder="Email Address"
          onChange={(e)=>{setEmail(e.target.value);setError("")}}
         /><br/>
        <input type="password" className="border border-black-500 rounded px-2 py-1  mt-2  w-full " placeholder="Password"
          onChange={(e)=>{setPassword(e.target.value);setError("")}}
        /><br/>
         
       <button 
  type="submit" 
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow my-5"
 
>
  Submit
</button>   <br/>
 <Link to={"/registration"} style={{color:"blueviolet"}}> Don't have an Account?</Link>
    </form>
   
    </div>
</div>
</div>
        </>
    );
}

export default Login;
