import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import User from "../model/User.js";
import Freelancer from "../model/Freelancer.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const protectedRoute = async(req ,res ,next) => {

    try {
        
        const token = req.cookies.token ;

        if (!token) {
            return res.status(400).json({
                success:false,
                message:"Unauthorized - Token not found"
            })
        }

        const decode = await jwt.verify(token , JWT_SECRET);

        if (!decode) {
            return res.status(400).json({
                success:false,
                message:"Unauthorized - Invalid Token"
            })
        }


        const user = await User.findById(decode.id).select("-password");



        if (!user) {
            return res.status(400).json({
                success:false,
                message:"User not found in Protected route"
            })
        }

        req.user = user;

        next()

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured in Proteced route => ${error}`
        })
    }

}



export  {protectedRoute };