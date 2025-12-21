import express from "express";
import { allfiles,deleteFiles } from "../controller/home.js";

const router=express.Router();

router.route("/files").get(allfiles).post(deleteFiles)

export default router