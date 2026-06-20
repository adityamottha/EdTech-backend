import { LiveSession } from "./liveSession.model.js";
import { ApiError } from "../../utils/ApiError.js"

// ================== CREATE LIVE SESSION ===============

export const createLiveSession = async (courseId,teacherId) =>{

    // check both id's are required
    if(!courseId) throw new ApiError(400,"courseId is required!");
    if(!teacherId) throw new ApiError(400,"teacherId is required!");

    // 
}