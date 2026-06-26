import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser",
        required:true,
        index:true
    },
    
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:255
    },

    message:{
        type:String,
        required:true,
        trim:true,
        maxLength:1000
    },

    type:{
        type:String,
        enum:[
            "WELCOME",
        "COURSE_ENROLLMENT",
        "TEACHER_APPLICATION",
        "TEACHER_APPROVED",
        "TEACHER_REJECTED",
        "LIVE_SESSION_CREATED",
        "LIVE_SESSION_STARTED",
        "LIVE_SESSION_COMPLETED",
        "LIVE_SESSION_CANCELLED",
        "PAYMENT_SUCCESS",
        "PAYMENT_FAILED",
        "GENERAL"
    ],
        default:"GENERAL"
    },

    isRead:{
        type:Boolean,
        default:false
    },

    priority:{
        type:String,
        enum:["LOW","MEDIUM","HIGH"],
        default:"MEDIUM"
    },

    relatedId:{
        type:Schema.Types.ObjectId
    },

    relatedModel:{
        type:String,
        enum:[
            "TeacherApplication",
            "Course",
            "LiveSession",
            "Payment"
        ]
    }

},{timestamps:true});

notificationSchema.index({
    userId:1,
    isRead:1,
    createdAt:-1
});

export const Notification = model("Notification",notificationSchema);