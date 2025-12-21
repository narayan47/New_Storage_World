import React, { useEffect, useState } from "react";
import '../index.css';
import App from "../App";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Nsw()
{
      const navigate=useNavigate();
  
   
  useEffect(() => {
    if (sessionStorage.getItem("loggin")) {
      navigate("/home");
    }
  }, [navigate]);

    return(
        <>
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Personal Cloud, Always With You
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Upload, organize, and manage your files securely in one place. 
          Access them anytime, anywhere with ease.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-2xl shadow-md hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </motion.div>
    </div>
    
        </>
    );
}


export default Nsw;