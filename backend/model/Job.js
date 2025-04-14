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

    description:{
        type:String,
        required:true
    },

    tags:{
        type:[String],
        enum:[ // Job Types
            "full-time", "part-time", "contract", "freelance", "internship", "remote", "hybrid", "on-site",
            
            // Industries
            "software development", "data science", "marketing", "design", "finance", "healthcare", 
            "education", "customer service", "sales", "engineering", "human resources", "legal", 
            "project management", "manufacturing", "real estate",
        
            // Programming & Tech Skills
            "JavaScript", "Python", "React", "Node.js", "MongoDB", "SQL", "AWS", "Docker", "DevOps", 
            "UI/UX", "Machine Learning", "Cybersecurity", "Swift", "Kotlin", "Flutter", "C++", "Rust",
        
            // Soft Skills
            "communication", "leadership", "teamwork", "problem-solving", "critical thinking", 
            "time management", "adaptability",
        
            // Salary Preferences
            "hourly", "fixed-price", "commission-based", "equity-based"]
    },

    type:{
        type:String,
        enum:["online" , "remote"],
        required:true
    },

    
    location: {
        type: String,
        validate: {
            validator: function (value) {
                if (this.type === "remote" && !value) {
                    return false;
                }
                return true;
            },
            message: "Location is required for remote jobs."
        }
    },

    salaryType:{
        type:String,
        enum:["hourly" , "fixed-rate"],
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },

    Bid:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bid"
    }],

    status:{
        type:String,
        enum:["open" , "closed"],
        default:"open"
    },

    assign_freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer"
    }


})

export default mongoose.model("Job" , jobSchema);