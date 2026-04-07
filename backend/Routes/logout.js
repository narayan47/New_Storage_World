import express from "express";
const router =express.Router();
import User from "../model/User.js";

router.get("/now",async(req,res)=>{
    try
    {
        const token=req.cookies.refreshToken;
        if(!token) return res.status(400)
        const match=User.verifyRefreshToken(token)
        if(!match) return res.status(400)
        const data=await User.updateOne({ _id: req.user._id},            
  { $pull: { refreshTokens: { token: req.cookies.refreshToken } } })
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken")
        res.set("Cache-Control", "no-store");
        res.send()
    }
    catch(err)
    {
        res.status(401).json({message:erro.message})
    }
})

export default router;