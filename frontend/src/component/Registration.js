import React, { useEffect, useState } from "react";
import '../index.css';
import App from "../App";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Registration()
{
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [rpassword,setRpassword]=useState("");
  const [phone,setPhone]=useState("");
  const [gander,setGander]=useState(null);
  const [error,setError]=useState("");
  const [data,setData]=useState("");
  const navigate=useNavigate();

  const getEmail=function(email){
    const emregex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(email=="") return;
    if(!emregex.test(email)) return;
     axios.post(`${process.env.REACT_APP_API_URL}/api/user/register/email`,{email}).then((res)=>{
        if(!res.data=="")
        {
          setError("Email Already exist so use diffrent Email");
        }
    }).catch((err)=>console.log("Axios Error",err.message))
  }

  const Submit=(e)=>{
    e.preventDefault(); 
    if(fname===""||lname===""||email===""||password===""||rpassword===""||phone===""||gander===null)
    {
        setError("Empty Filled Are not Allowes so Enter Proper Data Then Submit")
    }
    else if(password!==rpassword)
    {
      setError("Retype password must same as Password");
    }
    else if(phone.length!=10)
    {
        setError("Phone Number must have Exactly 10 digit")
    }
   else if (!/^[6-9][0-9]{9}$/.test(phone))
    {
      setError("Invalid number For India")
    }
    else
    {
      axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`, {
        f_name:fname,
        l_name:lname,
        email:email,
        password:password,
        phone:phone,
        gender:gander
      })
      .then(navigate("/login"))
      .catch(err=>console.log(err.message))
    }
  }
    return(
        <>
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
  <div className="max-w-md md:max-w-2xl w-full mx-4 bg-white shadow-md rounded-xl overflow-hidden">
    <div className="p-8 ">
      <div className="flex items-center justify-center  font-semibold tracking-wide text-indigo-500 "><img src="profile4.jpeg" className="rounded-full w-12 m-3"/>Registration</div> 
      <div className="flex justify-center"><p className="text-red-400">{error}</p></div>
    <form className="text-center" onSubmit={Submit}>
        <input onChange={(e)=>{setFname(e.target.value);setError("")}} value={fname} type="text" className="border border-black-500 rounded px-2 py-1  mt-2 w-full" placeholder="Frist Name"/><br/>
        <input type="text" className="border border-black-500 rounded px-2 py-1  mt-2  w-full  " placeholder="Last Name"
        onChange={(e)=>{setLname(e.target.value);setError("")}} value={lname}
        /><br/>
         <input type="email" className="border border-black-500 rounded px-2 py-1  mt-2  w-full " placeholder="Email Address"
         onChange={(e)=>{setEmail(e.target.value);setError("")}} value={email}
         onBlur={(e)=>getEmail(e.target.value)}
         /><br/>
        <input type="password" className="border border-black-500 rounded px-2 py-1  mt-2  w-full " placeholder="Password" minLength={6}
        onChange={(e)=>{setPassword(e.target.value);setError("")}} value={password}
        /><br/>
         <input type="password" className="border border-black-500 rounded px-2 py-1  mt-2  w-full " placeholder="Retype-Password"
         onChange={(e)=>{setRpassword(e.target.value);setError("")}} value={rpassword}
         /><br/>
         <input type="text" className="border border-black-500 rounded px-2 py-1  mt-2  w-full " placeholder="Phone Number"
         onChange={(e)=>{setPhone(e.target.value);setError("")}} value={phone}
         /><br/>
         <label>Gander : </label>
        <input type="radio" className="border border-black-500 rounded px-2 py-1  mt-2 mx-1   " name='gender' id="male" onChange={(e)=>{setGander(1);setError("")}} value={gander}  />
        <label for='male'>Male</label>
          <input type="radio" className="border border-black-500 rounded px-2 py-1  mt-2 mx-1 " name='gender' id="female"  onChange={()=>{setGander(0);setError("")}} value={gander}/>
        <label for='female'>Female</label><br/>
       <button 
  type="submit" 
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow my-5"
>
  Submit
</button> <br/>
<Link to={"/login"}  style={{color:"blueviolet"}}>Already have Account ?</Link> 
    </form>
    </div>
</div>
</div>

        </>
    );
}

export default Registration;