import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema({
    linkedin:{
        type:String,
        trim:true,
    },

    twitter:{
        type:String,
        trim:true
    },

    instagram:{
        type:String,
        trim:true
    },

    youtube:{
        type:String,
        trim:true
    }
});


const settingsSchema = new mongoose.Schema({
    theme:{
        type:String,
        enum:["LIGHT","DARK"],
        default:"LIGHT"
    },

    preferredLanguage:{
        type:String,
        default:"en"
    },

     notificationPreferences: {
      email: {
         type: Boolean, 
         default: true
        },

      sms: { 
        type: Boolean, 
        default: false 
        },

      push: { 
        type: Boolean, 
        default: true
        }
    },

     privacySettings: {
    profileVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public"
    },
    showEmail: {
      type: Boolean,
      default: false
    }
  }
})


const addressSchema = new mongoose.Schema({
    landmark:{
        type:String,
        trim:true
    },

    street:{
        type:String,
        trim:true
    },

    area:{
        type:String,
        trim:true
    },

    pincode:{
        type:String,
        trim:true
    },

    city:{
        type:String,
        trim:true
    },

    country:{
        type:String,
        trim:true
    }

});


const profileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AuthUser",
        required:true,
        unique:true,
        index:true
    },

    first_Name:{
        type:String,
        trim:true,
        required:true
    },

    last_name:{
        type:String,
        required:true,
        trim:true
    },

    avatar:{
        type:String // cloudinary
    },

    dateOfBirth:{
        type:Date
    },

    timezone:{
        type:String,
        default:"Asia/Kolkata"
    },

    bio:{
        type:String,
        trim:true,
        maxlength:500
    },

    socialLinks:socialLinksSchema,

    settings:settingsSchema,

    address:addressSchema

},{timestamps:true})

export const Profile = new mongoose.model("Profile",profileSchema)