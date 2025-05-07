import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "passport"
import fileUpload from "express-fileupload"

import {dbConnect} from "../backend/config/database.js"
import cloudinaryConnect from "../backend/config/cloudinary.js"

import userRouter from "./routes/userRoute.js"
import profileRoute from "./routes/profileRoute.js"
import jobRoute from "./routes/jobRoute.js"
import findJobRoute from "./routes/findJobRoute.js"
import googleRoute from "./routes/googleRoute.js"
import imgRouter from "./routes/imageRoute.js"
import getProfileRouter from "./routes/getProfileRoute.js"
import "./auth/google.js"
import getProjectRoute from "./routes/getProjectRoute.js"


dotenv.config()

const PORT = process.env.PORT;

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cookieParser())

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true  // Allow cookies & authentication headers
}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

dbConnect();
cloudinaryConnect();

//middleware
app.use(express.json())



app.use(passport.initialize());

//Routes
app.use("/api/user" , userRouter);
app.use("/auth" , googleRoute);
app.use("/api/profile" , profileRoute);
app.use("/api/job" , jobRoute);
app.use("/api/findJob" , findJobRoute);
app.use("/uploadImg" , imgRouter);
app.use("/get-profile" , getProfileRouter);
app.use("/api/get-projects" , getProjectRoute);


app.get("/" , (req ,res) => {
    res.send("<h1>Workify</h1>")
})

app.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`); 
})