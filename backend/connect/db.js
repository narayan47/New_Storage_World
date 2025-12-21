import mongoose from "mongoose";

const myConnection= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connection Success");
    }
    catch(error)
    {
         console.log("Database Connection Failed",error.message);
        process.exit(1)
    }
}

export default myConnection;