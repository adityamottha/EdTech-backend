import mongoose from "mongoose";
import bcrypt from "bcrypt"
const authUserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },

    phoneNumber :{
        type:String,
        trim:true,
        required:true,
        unique:true
    },

    password:{
        type:String,
        trim:true,
        required:true,
        select:false
    },

    isVarified:{
        type:Boolean,
        default:false
    },

    verificationToken:{
        type:String,
        select:false
    },

    resetPasswordToken:{
        type:String,
        select:false
    },

    resetPasswordExpiry:{
        type:String,
        select:false
    },

    loginAt:{
        type:Date,
    },

    logoutAt:{
        type:Date
    },

    loginAttempts:{
        type:Number,
        default:0
    },

    lockedUntil:{
        type:Date
    },

    // role reference
    role: {
        type:String,
        enum:["Student","Teacher","Admin"],
        required:true,
    }


},{timestamps:true});


// PASSWORD HASH
authUserSchema.pre("save", async function(){
   try {
     if(!this.isModified("password")) return;
 
     this.password = await bcrypt.hash(this.password,10)
   } catch (error) {
    console.log("BCRYPT-ERROR :-",error?.message || "Failed to hash password");
    next(error)
   }
})

// PASSWORD COMPARE
authUserSchema.methods.isPasswordCorrect = async function(password){
   try {
     return await bcrypt.compare(password,this.password)
   } catch (error) {
    console.log("BCRYPT-ERROR :- ",error?.message || "Failed to compare Password" );
    
   }
}

//REMOVE PASSWORD FROM JSON RESPONSE 
authUserSchema.set("toJSON",{
    transform:function(doc,ret,options){
        delete ret.password
        return ret
    }
});
export const AuthUser = mongoose.model("AuthUser",authUserSchema)