import {Schema,model} from "mongoose";

const teacherApplicationSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser",
        required:true,
        unique:true,
        index:true
    },

    specialization:{
        type:String
    },

    qualification:[
        {
            degree:{
                type:String
            },
            institution:{
                type:String
            },
            year:{
                type:Date
            }
        }
    ],

    approvalStatus:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },

    rejectedReason:{
        type:String
    }

    
},{timestamps:true});

export const TeacherApplication = model("TeacherApplication",teacherApplicationSchema)