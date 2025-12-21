import { Router } from "express";
import User from "../model/User.js";
import {userCreate,userLogin} from "../controller/user.js"

const router=Router()

router.route("/register").post(userCreate)

router.post("/register/email",async(req,res)=>{
    const user= await User.findOne({email:req.body.email},{email:1,_id:0});
    res.send(user);
})

router.post("/login",userLogin)



export default router;