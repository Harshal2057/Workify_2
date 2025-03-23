import express from "express";

import { signUp ,login ,logOut ,  checkAuth , accountType } from "../controller/authController.js";
import {protectedRoute} from "../middleware/protectedRoute.js"

const userRouter = express.Router();

userRouter.post("/signUp" , signUp);
userRouter.post("/login" , login);
userRouter.post("/logout" , logOut);

userRouter.put("/updateAccout" ,protectedRoute, accountType);
userRouter.get("/checkAuth", protectedRoute , checkAuth);


export default userRouter;