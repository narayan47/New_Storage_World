import mongoose from "mongoose"

const favorateSchema= new mongoose.Schema({
    inherit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Files',
        require:true
    },
    parentPath:{
        type:String,
        require:true
    },
    makeBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true
    }

},{timestamps:true})

export default mongoose.model("Favorate",favorateSchema);