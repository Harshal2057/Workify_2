import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import {dbConnect} from "../backend/config/database.js"
import userRouter from "./routes/userRoute.js"
import profileRoute from "./routes/profileRoute.js"


dotenv.config()

const PORT = process.env.PORT;

const app = express();

dbConnect();

//middleware
app.use(express.json())
app.use(cookieParser())

//Routes
app.use("/api/user" , userRouter);
app.use("/api/profile" , profileRoute);

app.get("/" , (req ,res) => {
    res.send("<h1>Workify</h1>")
})

app.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`); 
})