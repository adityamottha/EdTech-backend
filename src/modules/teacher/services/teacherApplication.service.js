import { TeacherApplication } from "../models/teacherApplication.model.js";
import { ApiError } from "../../../utils/ApiError.js";

const teacherApplicationService = async ({userId,specialization,qualification})=>{
    // check if fields are empty if true throw error
    if([userId,specialization,qualification].some(fields=>!fields?.trim())){
        throw new ApiError(400,"All fields are required!");
    };

    // find and throw error if teacher already submitted application
    const application = await TeacherApplication.findOne({userId});

    if(submittedApplication){
        throw new ApiError(409,"User already submitted application!")
    };

    // create application
    const CreateApplication = await application.create({
        userId,
        specialization,
        qualification,
        applicationSubmittedAt: new Date()
    });

    if(!CreateApplication){
        throw new ApiError(500,"Application failed to submit!")
    };

    // return
    
    return CreateApplication;
};

export { teacherApplicationService }