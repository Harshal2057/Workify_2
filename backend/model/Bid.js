import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({

    jobId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },

    freelancer : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer"
    },

    bid_amount : {
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["pending" , "accepted" , "rejected"],
        required:true
    }

})

export default mongoose.model("Bid" , bidSchema);