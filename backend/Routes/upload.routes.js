
import express from "express";
import upload from "../medalware/uploads.js";
import Files from "../model/FileData.js";
const router=express.Router();


router.route("/create").post(upload.single("file"),async(req,res)=>{
    try{

        const files=await Files.create({
            path:req.file.path,
            title:req.file.originalname,
            createdBy:req.user._id,
            inherit:req.body.inherit,
            publish_id:req.file.filename,
            mimeType:req.file.mimetype
        })
        res.send(req.file.originalname)
       
       
    }
    catch(error)
    {
        res.status(500)
        console.log(error.message)
    }
})



export default router;