import express from "express"
import { makeFavorate,favFiles } from "../controller/star.js"
const routes=express.Router()

routes.post("/create",makeFavorate)
routes.get("/files",favFiles);


export default routes