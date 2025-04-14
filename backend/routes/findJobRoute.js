import express from "express";
import { getAllJobs , tagJobs } from "../controller/findJob.js";


const findJobRoute = express.Router();

findJobRoute.get("/allJob" , getAllJobs);
findJobRoute.get("/tagJobs" , tagJobs);


export default findJobRoute;