import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({

    clientid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client"
    },

    title:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:["online" , "remote"],
        required:true
    },

    location:{
        type:String,
    },

    
    price:{
        type:String,
        required:true
    },

    Bid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bid"
    },

    status:{
        type:String,
        enum:["open" , "closed"],
        required:true
    },

    assign_freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer"
    }


})

export default mongoose.model("Job" , jobSchema);