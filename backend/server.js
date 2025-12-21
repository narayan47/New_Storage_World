import myConnection from "./connect/db.js";
import express from "express";

const serverStart=async (app)=>{
    try{
        await myConnection();

        app.listen(process.env.PORT, ()=>{
        console.log("Server Start")
})
    }
    catch(err)
    {
        console.log("Error find",err.message)
    }
}

export default serverStart