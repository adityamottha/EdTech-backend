import mongoose from "mongoose";

const refreshTokenSchema = new  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AuthUser"
    },

    refreshToken:{
        type:String,
        required:true,
        unique:true
    },

    tokenExpireAt:{
        type:Date,
        required:true
    },

    revoked:{
        type:Boolean,
        default:false
    },

    repacedByToken:{
        type:String
    }
    
},{timestamps:true});

export const RefreshToken = mongoose.model("RefreshToken",refreshTokenSchema)