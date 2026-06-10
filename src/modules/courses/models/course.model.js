import { Schema ,model } from "mongoose";

const courseSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    thumbnail:{
        type:String,
        required:true
    },

    price:{
        type:Number
    },

     instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authUser",
      required: true,
    },


    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

     ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: String,
      },
    ],


     averageRating: {
      type: Number,
      default: 0,
    },

      duration: {
      type: Number, // in minutes
      default: 0,
    },

     level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    language: {
      type: String,
      default: "English",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
},{timstamps:true});

export const Course = model("Course",courseSchema)