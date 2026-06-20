import { LiveSession } from "./liveSession.model.js";
import { ApiError } from "../../utils/ApiError.js"

// ================== CREATE LIVE SESSION ===============

export const createLiveSessionService = async (
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

    // check all data is required
    if(!title?.trim()) throw new ApiError(400,"title is required");
    if(!description?.trim()) throw new ApiError(400,"description is required");
    if(!durationMinutes) throw new ApiError(400,"durationMinutes is required");
    if(!meetingLink?.trim()) throw new ApiError(400,"meetingLink is required");
    if(!scheduledAt) throw new ApiError(400,"scheduledAt is required");

    // find and check is session already existed
    const existedSession = await LiveSession.findOne({
        courseId,
        meetingLink,
        scheduledAt
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