import { LiveSession } from "./liveSession.model.js";
import { ApiError } from "../../utils/ApiError.js"

// ================== CREATE LIVE SESSION ===============

export const createLiveSession = async (
    courseId,
    teacherId,
    title,
    description,
    durationMinutes,
    meetingLink,
    scheduledAt
) =>{

    // check both id's are required
    if(!courseId) throw new ApiError(400,"courseId is required!");
    if(!teacherId) throw new ApiError(400,"teacherId is required!");

    // find and check is session already existed
    const existedSession = await LiveSession.findOne({
        $or:[{_id},{meetingLink}]
    });

    if(existedSession){
        throw new ApiError(409, "live-session already existed!");
    };

    // create session 
    const createSession = await LiveSession.create({
    courseId,
    teacherId,
    title,
    description,
    durationMinutes,
    meetingLink,
    scheduledAt
    });

    // throw if session failed to create
    if(!createSession) throw new ApiError(500,"Session failed to create!")

    // return 
    return createSession;


}