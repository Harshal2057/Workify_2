import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    proj_name:{
        type:String,
        required:true
    },

    proj_url:{
        type:String,
        required:true
    },

    proj_desc:{
        type:String,
        required:true
    },

    uploaded_at:{
        type:Date,
        default:Date.now()
    }

})

export default mongoose.model("Project" , projectSchema);