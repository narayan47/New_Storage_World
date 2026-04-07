import Folder from "../model/Folder.js"
import Files from "../model/FileData.js";
import cloudinary from "../config/cloudinary.js";
import Favorate from "../model/Favorate.js";

export const getFolder=async(req,res)=>{
    try
    {
        if (!req.user || !req.user._id) {
    return res.status(401).json({
        status: false,
        message: "Unauthorized access"
    });
}
        const folder=await Folder.find({createdBy:req.user._id});
        const nowFolder=[];
        for(let i of folder)
        {
          if(i.inherit==req.query.path)
                nowFolder.push(i)
            
        }
        res.send(nowFolder)
       
    }
    catch(err)
    {
        console.log(err.message);
        res.status(505).json({message:err.message})
    }
    

}

export const createFolder=async(req,res)=>{
    if (!req.user || !req.user._id) {
    return res.status(401).json({
        status: false,
        message: "Unauthorized access"
    });
}
    const finded=await Folder.findOne({createdBy:req.user._id,title:req.body.name,inherit:req.body.path})
    if(finded)
    {
       return res.status(409).json({message:`${req.body.name} already exist so give other name`})
    }
    const folderData= await Folder.create({
        title:req.body.name,
        createdBy:req.user._id,
        inherit:req.body.path,
        ownpath:req.body.ownpath
    })
    res.send(201)
    
}

export const deleteFolder=async(req,res)=>{
try{
    if (!req.user || !req.user._id) {
    return res.status(401).json({
        status: false,
        message: "Unauthorized access"
    });
}
    const folder=await Folder.findById({_id:req.body.id})
    if(!folder) return res.status(401)
    const path=folder.ownpath
    const dfolder=await Folder.deleteOne({_id:req.body.id})
    if(!dfolder) return res.status(401)
     await Folder.deleteMany({
      inherit: { $regex: `^${path}` }
    });
    const files=await Files.find({inherit:{$regex:`^${path}`}})
    await files.map(item=>{
         cloudinary.uploader.destroy(item.publish_id)
    })
    await Favorate.deleteMany({
        parentPath:{$regex:`^${path}`}
    }
    )
    await Files.deleteMany({
        inherit:{$regex:`^${path}`}
    })
    
   res.send(201)
}
catch(err)
{
    console.log(err.message)
    
}
}



export const specFile=async(req,res)=>{
    try{
        let fullPath = req.originalUrl
    .replace(/^\/api\/folder\/path\/?/, "");
        let files;
           fullPath='/'+fullPath;
            files=await Files.find({inherit:fullPath,createdBy:req.user._id})
            res.send(files)
        
    }
    catch(err)
    {
        console.log("error",err.message)
    }
   
}