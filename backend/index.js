import dotenv from "dotenv";
dotenv.config();
import express from "express";
import serverStart from "./server.js";
import userRoutes from "./Routes/user.routes.js"
import homeFiles from "./Routes/home.routes.js";
import uploadFiles from "./Routes/upload.routes.js"
import authenticate from "./medalware/auth.js";
import cookieParser from "cookie-parser";
import folders from "./Routes/folder.routes.js"
import logout from "./Routes/logout.js"
import userData from "./Routes/userdata.route.js"
import StarFiles from "./Routes/star.route.js"
import downloadFile from "./Routes/download.route.js"
import cheackFileExist from "./Routes/cheackFileExist.route.js"
import cors from "cors"



const app=express();
app.use(cors({origin:"https://new-storage-worlds.onrender.com",credentials:true}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/user",userRoutes);
app.use("/api/files",authenticate,uploadFiles)
app.use("/api/home",authenticate,homeFiles);
app.use("/api/folder",authenticate,folders);
app.use("/api/deshbord",authenticate,userData)
app.use("/api/star",authenticate,StarFiles)
app.use("/api/logout",authenticate,logout)
app.use("/api/download",authenticate,downloadFile)
app.use("/api/path",authenticate,cheackFileExist)
app.use('/api/login',authenticate,(req,res)=>{
     res.status(200).json({ status: true });
})

serverStart(app)