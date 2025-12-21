import mongoose from "mongoose";

const FolderSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    createdBy:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    inherit:{
        type:String,
        require:true
    },
    ownpath:{
        type:String,
        require:true
    }

},{timestamps:true})



export default mongoose.model("Folder",FolderSchema)