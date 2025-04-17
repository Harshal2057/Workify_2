import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.JWT_SECRET_KEY;

const generateToken = async(userid , res) => {
    try {
        
        const token = await jwt.sign({id : userid} , privateKey , {expiresIn : "7d"});
        console.log("Token generated successfully");

        console.log(`Token => ${token}`)
        
        res.cookie("token" , token , {
            maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            secure:process.env.NODE_ENV !== "development",
            sameSite:"strict"
        }) 

        return token;

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while creating token => ${error}`
        })
    }
}




export  {generateToken };
