import { createLiveSessionService } from "./liveSession.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";

export const createLiveSessionController = AsyncHandler(async (req,res)=>{

    // get teacherId
    const teacherId = req.user?._id;

    // get courseId
   const { courseId } = req.params;

   // get data from req body 
   const {
    title,
    description,
    durationMinutes,
    meetingLink,
    scheduledAt
   } = req.body 

   //  call service function and pass parameter
   const session = await createLiveSessionService(
    courseId,
    teacherId,
    title,
    description,
    durationMinutes,
    meetingLink,
    scheduledAt
   );

   // send response
   return res.status(200).json(
    new ApiResponse(200,session,"Session has been created succesfully")
   );

})