import { TeacherApplication } from "../models/teacherApplication.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import NotificationService from "../../notification/notification.service.js";

const teacherApplicationService = async ({userId,specialization,qualification})=>{
    // check if fields are empty if true throw error
   if(!userId){
    throw new ApiError(400,"userId is Required!")
   };

   if(!specialization?.trim()){
    throw new ApiError(400,"specialization is required!")
   };

   if(!qualification){
    throw new ApiError(400,"Qualification is required!")
   };


    // find and throw error if teacher already submitted application
    const existedApplication = await TeacherApplication.findOne({userId});

    if(existedApplication){
        throw new ApiError(409,"User already submitted application!")
    };

    // create application
    const application = await TeacherApplication.create({
        userId,
        specialization,
        qualification,
        applicationSubmittedAt: new Date()
    });

    if(!application){
        throw new ApiError(500,"Application failed to submit!")
    };

    // push notification for application
    const applicationId = application._id
    await NotificationService.notifyTeacherWhenAppliedForTeacher(userId,applicationId)
    
    // return
    return application;
};

export { teacherApplicationService }