import cloudinary from "../config/cloudinary.js"
import Favorate from "../model/Favorate.js"
import Files from "../model/FileData.js"

export const allfiles=async (req,res)=>{
    try
    {
        const files=await Files.find({createdBy:req.user._id})
        res.send(files)
    }
    catch(err)
    {
        res.status(500)
    }
}


export const deleteFiles=async(req,res)=>{
    try{
        const files=await Files.findById(req.body.id)
        if(!files) return res.status(401).json({message:"file are not availebel"})
     await cloudinary.uploader.destroy(files.publish_id,{
  resource_type: "raw",
  invalidate: true
})
        await Favorate.deleteOne({inherit:req.body.id})
        await Files.findByIdAndDelete(req.body.id)
        res.json({status:200,message:"Deleted Successfully"})
    }
    catch(err)
    {
        res.status(500)
        console.log(err.message)
    }
}
