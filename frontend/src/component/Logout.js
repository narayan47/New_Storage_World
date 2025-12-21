import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Logout(){
    const navigate=useNavigate();
   useEffect(() => {
    axios.get("/api/logout/now")
    .then(navigate("/login"))
    .catch(err=>console.log(err))
  }, [navigate]);
}
export default Logout;