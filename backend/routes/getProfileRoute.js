import express from "express";
import getFreelancerPofile from "../controller/getProfile.js";
import {protectedRoute} from "../middleware/protectedRoute.js"

const getProfileRouter = express.Router();

getProfileRouter.get("/get-freelancer" ,protectedRoute , getFreelancerPofile );

export default getProfileRouter;