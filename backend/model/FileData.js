import mongoose from "mongoose";

const FileSchema= new mongoose.Schema({
    path:{
        type:String,
        require:true
    },
    title:{type:String,
        require:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    },
    inherit:
    {
        type:String,
        require:true
    },
    publish_id:{
        type:String,
        require:true
    },
    favorete:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


export default mongoose.model("Files",FileSchema)