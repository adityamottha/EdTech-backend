import { Schema,model } from "mongoose";

const studentProfileSchema = new Schema({
    profileId:{
        type:Schema.Types.ObjectId,
        ref:"Profile",
        index:true,
        unique:true,
        required:true
    },

    enrollmentDate:{
        type:Date,
        default:Date.now() // update date when user enroll course
    },

    currentLevel:{
        type:String,
        enum:["Beginner","Intermediate", "Advanced"],
        default:"Beginner"
    },

    totalCourseEnrollment:{
        Type:Number,
        default:0
    },


    completedCourses: {
      type: Number,
      default: 0
    },

    averageGrade: {
      type: Number,
      default: 0
    },

    pointsEarned:{
        type:Number,
        default:0
    },

    badges: [
      {
        type: String
      }
    ]

},{timestamps:true});

export const studentProfile = model("StudentProfile",studentProfileSchema)