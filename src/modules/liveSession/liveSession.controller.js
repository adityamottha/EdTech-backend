import { createLiveSessionService, getLiveSessionService, updateLiveSessionService } from "./liveSession.service.js";
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


// =================== GET LIVE SESSION =======================
export const getLiveSessionController = AsyncHandler(async (req,res) =>{
    
    // get courseId from params
    const { courseId } = req.params;

    // call service function 
    const liveSession = await getLiveSessionService(courseId)

    // response 
    return res.status(200).json(
        new ApiResponse(
            200,
            liveSession,
            "live session fetched succesfully!"
        )
    );
});

// ================== LIVE SESSION UPDATE ===========
export const updateLiveSessionController = AsyncHandler(async (req,res) =>{

    // get session id in params
    const { sessionId } = req.params;

    // get data from req.body 
    const data = req.body

    console.log("DATA", data)
    console.log("SESSION-ID", sessionId)

    // call service function
    const session = await updateLiveSessionService(sessionId,data);

    // return
    return res.status(200).json(
        new ApiResponse(
            200,
            session,
            `Updated data successfully!`
        )
    );

});