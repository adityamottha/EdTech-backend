import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema({
    studentId:{
    type:Schema.Types.ObjectId,
    ref:"AuthUser",
    required:true
  },

  courseId:{
    type:Schema.Types.ObjectId,
    ref:"Course",
    required:true
  },

  paymentId:{
    type:Schema.Types.ObjectId,
    ref:"Payment"
  },

  status:{
    type:String,
    enum:[ "Active","Completed","Cancelled"],
    default:"Active"
  },

  enrolledAt:{
    type:Date,
    default:Date.now
  },

  completedAt:{
    type:Date
  }

},{timestamps:true});

// restrict duplicate enrollment
enrollmentSchema.index(
  {
    studentId: 1,
    courseId: 1,
  },
  {
    unique: true,
  }
);


export const Enrollment = model("Enrollment", enrollmentSchema )
