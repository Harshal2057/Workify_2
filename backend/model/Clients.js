import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    fullName : {
        type:String,

    },
    
    contact:{
        type:String,
        required:true
    },

    location:{
        type:String,
    },

    DateOfBirth : {
        type:Date
    },

    email:{
        type:String,
        required:true
    },
    
    Completed_job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },
    
    Pending_job:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }],

    payment:{
        type:String,
       default:""
    }

})

export default mongoose.model("Clients" , clientSchema);