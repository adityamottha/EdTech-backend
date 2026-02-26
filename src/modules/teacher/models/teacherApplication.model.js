import {Schema,model} from "mongoose";

const teacherApplicationSchema = new Schema({

},{timestamps:true});

export const TeacherApplication = model("TeacherApplication",teacherApplicationSchema)