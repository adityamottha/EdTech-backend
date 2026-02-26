import {Schema,model} from "mongoose";

const teacherProfileSchema = new Schema({
    profileId:{
        type:Schema.Types.ObjectId,
        ref:"Profile",
        required:true,
        unique:true,
        index:true
    },

    hiredDate:{
        type:Date
    },

    specialization:{
        type:String,
        trim:true
    },

    qualification:[
        {
            degree:{
                type:String,
                trim:true
            },
            insititution:{
                type:String,
                trim:true
            },
            year:{
                type:Date
            }
        }
    ],

    courseTought:[{
        type:Schema.Types.ObjectId,
        ref:"Course"
    }],

    rating:{
        type:Number,
        default:0
    },

    totalStudent:{
        type:Number,
        default:0
    },

    // APPROVAL 

    approvalStatus:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },

    isApproved:{
        type:Boolien,
        default:false
    },

    approvedBy:{
        type:Schema.Types.ObjectId,
        ref:"Profile"
    },

    approvedDate:{
        type:Date
    },

    // BANKING
    bankDetails: {
      type: String // store encrypted JSON string
    }
    
},{timestamps:true});

export const Teacher = model("Teacher",teacherProfileSchema);