import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
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

    lastLogin:{
        type:Date,
    },

    loginAttempts:{
        type:Number,
        default:0
    },

    lockedUntil:{
        type:Date
    },

    // role reference
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],


},{timestamps:true});

export const AuthUser = mongoose.model("AuthUser",authUserSchema)