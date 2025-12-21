import express from "express";
const router=express.Router();
import { getFolder,createFolder,deleteFolder, specFile } from "../controller/folder.js";

router.route("/files")
.get(getFolder)
.post(createFolder)

router.post("/delete",deleteFolder)
router.use("/path",specFile)


export default router