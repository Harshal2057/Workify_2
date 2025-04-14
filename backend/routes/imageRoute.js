import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {profilePicUpload , backgroundPicUpload} from "../controller/fileUpload.js";

const imgRouter = express.Router();

imgRouter.post("/profile" ,protectedRoute ,  profilePicUpload)
imgRouter.post("/background", protectedRoute , backgroundPicUpload)

export default imgRouter;