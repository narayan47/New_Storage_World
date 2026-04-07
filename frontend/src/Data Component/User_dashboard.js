import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function User_dashboard() {
  const [user,setUser]=useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/deshbord/data`,{withCredentials:true})
    .then(res=>setUser([res.data]))
    .catch(err=>{if(err.response?.status === 401){
  navigate("/login");
}})
  },[])

  return (
    <>
      <div className="flex justify-center items-center mt-10 shadow w-4/5 ml-32">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <tbody>
            { user.map(item=>(
              <tr key={item._id} className="border border-gray-300">
                <td className="p-2">
                  <img
                    src="profile4.jpeg"
                    className="rounded-full w-12 m-3"
                    alt="profile"
                  />
                </td>
                <td className="p-2" title='Full Name'>{item.firstname} {item.lastname}</td>
                <td className="p-2" title="Email">{item.email}</td>
                <td className="p-2" title="Phone Number">{item.phone}</td>
                <td className="p-2" title="Gander">{item.gender===1?"Male":"Female"}</td>
              </tr>
))} 
          </tbody>
        </table>
      </div>
      <Footer user={true} />
    </>
  );
}

export default User_dashboard;
