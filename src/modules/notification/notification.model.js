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
        enum:[],
        default:""
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