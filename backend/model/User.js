import mongoose from "mongoose";

 const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String
    },

    account:{
        type:String,
        enum:["freelancer" , "client"],
    }

})

export default mongoose.model("User" , UserSchema);