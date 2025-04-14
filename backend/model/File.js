import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({

    name : {
        type:String
    },

    imageUrl : {
        type:String
    },

    tags : {
        type:String
    }

})

export default mongoose.model("Files" , fileSchema);

