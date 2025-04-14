import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";

import Freelancer from "../model/Freelancer.js";
import User from "../model/User.js";

function isFileTypeSupported(supportedTypes , fileType){
    console.log("Checking if file is supported");
    return supportedTypes.includes(fileType);
}

async function uploadToCloudinary(file , folder){
    const options = {folder};

    console.log(file.tempFilePath);
    
    return await cloudinary.uploader.upload(file.tempFilePath , options)
}


const profilePicUpload = async(req , res) => {

    try {
        
       const user = req.user;

       if (!user) {
        return res.status(400).json({
            success:false,
            message:"No user found"
        })
       }
       

     const freelancer = await Freelancer.findOne({UserId:user._id})
    

     const freelancer_id = freelancer._id.toString();
     console.log(freelancer_id);
     
     if (!req.files || !req.files.imageFile) {
        return res.status(400).json({
            success: false,
            message: "No image file uploaded"
        });
    }

        const profile_pic = req.files.imageFile;

        const supportedTypes = ["png" , "jpg" , "jpeg"];
        const fileType = profile_pic.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(supportedTypes , fileType)) {
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        }

        console.log("Uploading file to clooudinary");
        const response = await uploadToCloudinary(profile_pic , "Profile_Pic");
        console.log("File uploaded to Cloudinary");
        console.log(response);
        
       const newImg = await Freelancer.findByIdAndUpdate(
        freelancer_id,
        {
            $set:{
                profilePicUrl:response.secure_url
            }
        },
        {new:true}
       )

        res.status(200).json({
            newImg,
            success:true,
            message:"Image uploaded successfully"
        })

    } catch (error) {
     return   res.status(400).json({
            success:false,
            message:`Error occured while uploading profilepic => ${error}`
        })
    }

}

const backgroundPicUpload = async(req ,res) => {

    try {
        
        const user = req.user;

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"No user found"
            })
        }

       
    
        const freelancer = await Freelancer.findOne({UserId : user._id});
        const freelancer_id = freelancer._id.toString();

        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success:false,
                message:"No image found"
            })
        }

        const back_pic = req.files.imageFile;

        const back_pic_type = back_pic.name.split(".")[1].toLowerCase();

        const supportedType = ["jpg" , "jpeg" , "png"];

        if (!isFileTypeSupported(supportedType , back_pic_type)) {
            return res.status(400).json({
                success:false,
                message:"File Type not supported"
            })
        }

        console.log("File Uploading to Cloudinary...");
        const response = await uploadToCloudinary(back_pic , "Background_pic");
        console.log("File successfully uploaded to Cloudinary");
        console.log(response);

        const newImg = await Freelancer.findByIdAndUpdate(
            freelancer_id,
            {
                $set:{
                    backgroundPic:response.secure_url
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully !!!",
            newImg
        })
        
        
        

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while uploading Back_pic image => ${error}`
        })
    }

}



export  {profilePicUpload , backgroundPicUpload};