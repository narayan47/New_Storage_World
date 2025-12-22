import express from "express"
import Folder from "../model/Folder.js"

const router=express.Router()

router.post('/cheack',async(req,res)=>{
    try
    {
        const files=await Folder.find({ownpath:req.body.path})
    if(files.length<=0) return res.status(401).json("wrong path");
    res.send(200)
    }
    catch(err)
    {
        console.log(err.message)
    }
    
})

export default router