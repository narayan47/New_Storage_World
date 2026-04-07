import { set } from "mongoose";
import User from "../model/User.js";
 export const userCreate=async (req,res)=>{
      try
        {
            console.log("user data",req.body)
            const user=await User.create({
            firstname:req.body.f_name,
            lastname:req.body.l_name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            gender:req.body.gender
             });
            res.send("User Recored inserted successfully",user);
        }
        catch(err)
        {
            console.log("user save Error",err.message);
            res.status(400).json({message:err.message})
        }
}

export const userLogin=(async(req,res)=>{
    try
    {
        console.log("login data",req.body)
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({
            message:"Enter Valid Email Address "
        })
    } 
    const match= await user.isPasswordCorrect(req.body.password);
    if(!match) return res.status(400).json({message:"password not match"});
    
    const token= user.getAccessToken();
    const refreshToken=user.getRefreshToken();
    user.refreshToken.push({
        token:refreshToken
    })
    user.save();
    res.cookie("accessToken",token,{
         maxAge: 5 * 60 * 1000
    });
    res.cookie("refreshToken",refreshToken,{
        maxAge:604800000
    });
    res.status(200).json({status:true})
}
catch(err)
{
    res.status(505).json({
        message:err.message
    })
}
    
})

