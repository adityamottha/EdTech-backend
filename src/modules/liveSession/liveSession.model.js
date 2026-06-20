import { Schema,model } from "mongoose";

const liveSessionSchema = new Schema({
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true

    },
    teacherId:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser",
        required:true
    },

    title:{
        type:String,
        required:true
    },

     description:{
        type:String,
        required:true
     },

     durationMinutes:{
        type:Number,
        default:0,
        required:true
     },

     sessionStatus:{
        type:String,
        enum:["NOT_STARTED", "ON_GOING", "COMPLETED","CANCELLED"],
        default:"NOT_STARTED"
     },

     scheduledAt :{
        type:Date,
        required:true
     },

     startAt:{
        type:Date
     },

     completedAt:{
        type:Date
     }

},{timestamps:true});

export const LiveSession = model("LiveSession",liveSessionSchema);