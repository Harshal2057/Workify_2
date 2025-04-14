import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({

    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

fullName:{
    type:String,
    required:true
},

contact:{
    type:String,
    default:""
},

profilePicUrl:{
    type:String
},

backgroundPic:{
    type:String
},

email:{
    type:String,
    required:true
},

location:{
    type:String,
},

github:{
    type:String,
    default:""
},

about:{
    type:String,
    default:""
},

skills:{
    type:[String],
     default:[]
},

education:{
    type:[String],
     default:[]
},

projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
}],

Bid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Bid"
},

Assigned_job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job"
},

Completed_job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job"
},

Pending_job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job"
},

Earning:{
  type:String,
  default:""
}

})

export default mongoose.model("Freelancer" , freelancerSchema);