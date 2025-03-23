import User from "../model/User.js";
import Freelancer from "../model/Freelancer.js";
import Client from "../model/Clients.js";

import bcrypt from "bcryptjs";


import {generateToken , freelancerToken} from "../utils/token.js";

const signUp = async(req ,res) => {

    const saltRounds = 10;

    try {
        
        const {name , email , password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields required !!"
            })
        }

        const checkEmail = await User.findOne({email});

        if (checkEmail) {
            return res.status(400).json({
                success:false,
                message:"User already exists !!"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success:false,
                message:"Password too weak"
            })
        }

        const hashedPassword = await bcrypt.hash(password , saltRounds);
        console.log(`Hashed password is => ${hashedPassword}`);
        
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        })

        console.log("User created successfully");

        if (newUser) {
            
            const token = await generateToken(newUser._id , res);
            console.log(`Token is => ${token}`);
            
           return res.status(200).json({
                success:true,
                message:"User signup successfully !!",
                user:newUser,
                token:token
            })
        }
        

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while Signing up => ${error}`
        })
    }
}

const login = async(req ,res) => {

    try {
        
        const {email , password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields required !!"
            })
        }

        const checkEmail = await User.findOne({email});

        if (!checkEmail) {
            return res.status(400).json({
                success:false,
                message:"NO user found"
            })
        }

        const confirmPassword = await bcrypt.compare(password , checkEmail.password);

        if (!confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
        })
        }

        const token = await generateToken(checkEmail.id , res);

        if (!token) {
            return res.status(400).json({
                success:false,
                message:"Error occred while creating token"
            })
        }

        let freeToken = null;
        if (checkEmail.account === "freelancer") {
            const freelancer = await Freelancer.findOne({ UserId: checkEmail._id }, { _id: 1 });
            if (freelancer) {
                freeToken = await freelancerToken(freelancer._id, res);
            }
        }

        return res.status(200).json({
            success: true,
            message: "User logged in successfully !!",
            user: checkEmail.id,
            token: token,
            ...(freeToken && { freeToken }) 
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while loggin in  => ${error}`
        })
    }

}

const logOut = async(req ,res) => {

    try {
        
        res.cookie("token" , "" , {maxAge:0})
        return res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while logging out user => ${error}`
        })
    }

}

const checkAuth = async(req ,res) => {

    try {
        
        res.status(200).json(req.user);

    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Error occured while checkauth => ${error}`
        })
    }

}

const accountType = async(req ,res) => {

    try {
        
        const {account} = req.body;
        const user = req.user;

        if (!["freelancer" , "client"].includes(account)) {
            return res.status(400).json({
                success:false,
                message:"Invalid account type"
            })
        }

        const updateUser = await User.findByIdAndUpdate(
            user._id,
            {account},
            {new:true}
        )

        if (!updateUser) {
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        if (account === "freelancer") {
            
            const freeLanceProfile = await Freelancer.create({
                UserId:user._id,
                fullName:user.name,
                contact:"",
                email:user.email,
                location:"",
                github:"",
                about:"",
                skills:[],
                education:[],
                Earning:"0"
            })

            console.log("Freelance profile created successfully");

            if (freeLanceProfile) {
                
                const freeToken = await freelancerToken(freeLanceProfile._id , res);
                console.log(`Free token is => ${freeToken}`);

                return res.status(200).json({
                    success:true,
                    message:"User account updated successfully",
                    user:updateUser,
                    freeLanceProfile,
                    freeToken:freeToken
                })
    
            }

        }


        return res.status(200).json({
            success:true,
            message:"User account updated successfully",
            user:updateUser
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while updating user account => ${error}`
        })
    }

}

export {signUp , login ,logOut , checkAuth , accountType};