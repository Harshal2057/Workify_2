import express from "express";

import {clientProfile , freelanceProfileInfo , freelanceProfileSkills , freelancerProject} from "../controller/profileController.js";
import {protectedRoute } from "../middleware/protectedRoute.js";

const profileRoute = express.Router();

//Client Routes
profileRoute.post("/client",protectedRoute , clientProfile);

//Freelance Routes
profileRoute.post("/freelancer/info" , protectedRoute , freelanceProfileInfo);
profileRoute.post("/freelancer/xtraDetails" , protectedRoute , freelanceProfileSkills);
profileRoute.post("/freelancer/project" , protectedRoute , freelancerProject );

export default profileRoute;