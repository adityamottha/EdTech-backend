import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authUserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        sparse:true
    },

    phoneNumber :{
        type:String,
        trim:true,
        required:true,
        unique:true,
        sparse:true
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

    // PROFILE REFERENCE 

     studentProfileId: {
      type: Schema.Types.ObjectId,
      ref: "StudentProfile",
    },

    teacherProfileId: {
      type: Schema.Types.ObjectId,
      ref: "TeacherProfile",
    },

    adminProfileId:{
        type: Schema.Types.ObjectId,
        ref: "AdminProfile"
    },

    //    SECURITY & SESSION CONTROL

    lastLoginAt: {
      type: Date,
    },

    lastLogoutAt: {
      type: Date,
    },

    loginCount:{
        type:Number,
        default:0
    },

    loginAttempts:{
        type:Number,
        default:0
    },

    lockedUntil:{
        type:Date
    },

    refreshTokenVersion: {
    type: Number,
    default: 0
    },

    // role reference
    role: {
        type:String,
        enum:["Student","Teacher","Admin"],
        required:true,
    },

     createdBy: {
      type: String,
      enum: ["SELF", "ADMIN"],
      default: "SELF",
    },
    
    //    SOFT DELETE
   
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "AuthUser",
    },


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

authUserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            role:this.role
       },
       process.env.ACCESS_TOKEN_SECRET,
       {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
       }
)
}

authUserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const AuthUser = mongoose.model("AuthUser",authUserSchema)