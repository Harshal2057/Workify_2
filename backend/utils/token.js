import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.JWT_SECRET_KEY;

const generateToken = async(userid , res) => {
    try {
        
        const token = await jwt.sign({id : userid} , privateKey , {expiresIn : "1h"});
        console.log("Token generated successfully");
        
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

const freelancerToken = async (freeId, res) => {
    try {
        const freeToken = await jwt.sign({ id: freeId }, privateKey, { expiresIn: "1h" });
        console.log("Freelancer token created successfully");

        res.cookie("freeToken", freeToken, { // 🔥 Used consistent lowercase
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
            httpOnly: true,
            secure: false, // 🔥 Set to false for local development
            sameSite: "Strict"
        });

        return freeToken;

    } catch (error) {
        console.error(`Error occurred while creating freeToken => ${error}`);
        throw new Error("Token creation failed");
    }
};


export  {generateToken , freelancerToken};
