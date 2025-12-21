import express from "express"
import User from "../model/User.js"
const routes=express.Router()

routes.get("/data",async(req,res)=>{
    try{
        const users=await User.findById({_id:req.user._id})
    res.send(users)
    }
    catch(err)
    {
        console.log(err.message)
    }
    
})


export default routes