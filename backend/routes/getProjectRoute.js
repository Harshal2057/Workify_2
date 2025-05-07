import express from "express";

import getProjects from "../controller/getProjects.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const getProjectRoute = express.Router();

getProjectRoute.get("/allProjects" , protectedRoute , getProjects);

export default getProjectRoute;