import { Schema,model } from "mongoose";

const demoLiveClassSchema = new Schema({

},{timestamps:true});

export const DemoLiveClass = model("DemoLiveClass",demoLiveClassSchema)