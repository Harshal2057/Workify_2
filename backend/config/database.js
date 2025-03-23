import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

export const dbConnect = async() => {

    try {
        
        await mongoose.connect(DATABASE_URL);
        console.log("Database connected successfully !!")

    } catch (error) {
        console.log(error)
        console.log("Issue in db connection !!")
    }

}