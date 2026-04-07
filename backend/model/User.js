import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        recomanded:true,
    },
    lastname:{
        type:String,
        recomanded:true
    },
    email:{
        type:String,
        recomanded:true,
        uniq:true
    },
    password:{
        type:String,
        recomanded:true
    },
    phone:{
        type:String,
        recomanded:true
    },
    gender:{
        type:Number,
        recomanded:true,
    },
    refreshToken:[{
        token:String,
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }]

},{timestamps:true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

     try {
        this.password = await bcrypt.hash(String(this.password), 10);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.isPasswordCorrect=async function(password)
{
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.getAccessToken=function(){
   return jwt.sign({
        _id:this.id,
        email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    }
    )
}

userSchema.statics.verifyToken=function(token){
  try{
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   } catch (err) {
    if (err.name === "TokenExpiredError") {
      return null; 
    }
    return null; 
  }
}
   

userSchema.statics.verifyRefreshToken=function(refreshToken){
   try{
    return jwt.verify(refreshToken,process.env.REFRES_TOKEN_SECRET)
   } 
   catch(err)
   {
        if(err.name=="TokenExpiredError")
        {
             return null;   
        }  
        return null
   }
}

userSchema.methods.getRefreshToken=function(){
 return jwt.sign({
        _id:this.id,
    },
    process.env.REFRES_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRES_TOKEN_EXPIRE
    }
    )
}

export default mongoose.model("User",userSchema);