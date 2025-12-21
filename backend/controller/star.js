import Favorate from "../model/Favorate.js";
import Files from "../model/FileData.js"

export const makeFavorate=async(req,res)=>{
    try{
    const cheackFav=await Favorate.find({inherit:req.body.id,makeBy:req.user._id})
    if(cheackFav.length>0)
    {
        const notfav=await Favorate.deleteOne({inherit:req.body.id,makeBy:req.user._id})
        if(!notfav) return res.status(401)
        await Files.updateOne({_id:req.body.id},{$set:{favorete:false}})
        res.status(200).json({message:"Success"})
    }
    else
    {
        const ffs=await Files.findById({_id:req.body.id,createdBy:req.user._id});
        
         const files=await Favorate.create({
        inherit:req.body.id,
        parentPath:ffs.inherit,
        makeBy:req.user._id
    })   
    if(!files) return res.status(401)
    await Files.updateOne({_id:req.body.id},{$set:{favorete:true}})
    res.status(201).json({message:"Sucssess 2.0"})
    }
}
catch(err)
{
    console.log(err.message)
    res.status(401)
}
}




export const favFiles=async(req,res)=>{
    try{
       const fav=await Favorate.find({makeBy:req.user._id});
       if(fav.length>0)
       {
        const nowFiles=[];
        for(let i of fav)
        {
            const files=await Files.findById(i.inherit)
            nowFiles.push(files)
        }
        if(nowFiles.length>0)
            res.send(nowFiles)
        else
            res.send(nowFiles)
               

        }
        else
        {
            res.send([])
            
        }
    }
    catch(err)
    {
        res.status(404)
        console.log(err.message)
    }
}