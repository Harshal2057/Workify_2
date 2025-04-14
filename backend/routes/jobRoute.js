import express from 'express';
import { postJob , deleteJob , getAllJobs } from '../controller/postJobController.js';
import {protectedRoute } from "../middleware/protectedRoute.js";


const jobRoute = express.Router();

jobRoute.post("/post/job", protectedRoute , postJob);
jobRoute.delete("/delete/:jobid" ,protectedRoute , deleteJob );
jobRoute.get("/get/allJobs" ,protectedRoute , getAllJobs );

export default jobRoute;