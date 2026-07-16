import { LiveSession } from "./liveSession.model.js";
import { ApiError } from "../../utils/ApiError.js"
import NotificationService from "../notification/notification.service.js";

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

        
    // push notifications to students about liveSession
    await NotificationService.liveSessionCreateNotificationService({courseId,title,liveSessionId:createSession._id})

    // return 
    return createSession;


};


// ======================== GET LIVE SESSION==================
export const getLiveSessionService =  async (courseId) =>{

    // check course id is required!
    if(!courseId){
        throw new ApiError(
            400,
            "CourseId is required"
        );
    };

    // find session by courseId and populate teacher name and email
    const liveSession = await LiveSession.findOne({
        courseId,
        isDeleted:false
    })
    .populate(
        "teacherId",
        "email role"
    )
    .sort({scheduledAt:1});

    // check session available
    if(!liveSession){
        throw new ApiError(
            409,
            "Live session not found!"
        );
    };

    // return 
    return liveSession;

};


// ================= UPDATE LIVE SESSION ======================
export const updateLiveSessionService = async (sessionId, data) =>{

    // check fielda are available 
    if(!sessionId){
        throw new ApiError(
            400,
            "sessionId is required!"
        );
    };

    if(!data){
        throw new ApiError(
            400,
            "data for updation is required!"
        );
    };

    // dot not allow system fields to be update 
      delete data.teacherId;
      delete data.courseId;
      delete data.sessionStatus;
      delete data.startedAt;
      delete data.completedAt;

    // find session by sessionId and update 
    const session = await LiveSession.findByIdAndUpdate(
        sessionId.trim(),
        data,
        {
            new:true,
            runValidators:true
        }
    );

    // check update completed
    if(!session){
        throw new ApiError(
            500,
            "Failed to update live-session"
        );
    };

    // return
    return session;
};

// ================== START LIVE SESSION ========================

export const startLiveSessionService = async (sessionId) =>{
    // check sessionId is available
    if(!sessionId){
        throw new ApiError(
            400,
            "sessionId is required!"
        );
    };

    // find and update session status to on_going
    const session = await LiveSession.findByIdAndUpdate(
        sessionId.trim(),
        {
            sessionStatus:"ON_GOING",
            startAt: new Date()
        },
        {
            new:true,
            runValidators:true
        }
    );

    // check if status updated if not give error 
    if(!session){
        throw new ApiError(
            500,
            "Failed to start live class!"
        );
    };

    // push notification
    await NotificationService.startLiveSessionNotificationService({
        courseId:session.courseId,
        title:session.title,
        liveSessionId:sessionId,
        meetingLink:session.meetingLink
    });

    // return
    return session

};

// =================== CANCEL LIVE SESSION ======================
export const cancelLiveSessionService = async (sessionId) =>{

    // check sessionId is available
    if(!sessionId){
        throw new ApiError(
            400,
            "SessionId is required!"
        );
    };

    // find and update live-session status to cencalled
    const session = await LiveSession.findByIdAndUpdate(
        sessionId,
        {
            sessionStatus:"CANCELLED",
            cancelledAt:new Date()
        },
        {
            new:true,
            runValidators:true
        },
    );

    // check is failed to update status
    if(!session){
        throw new ApiError(
            500,
            "failed to update session live status"
        );
    };

    // push notification
    await NotificationService.cancelLiveSessionNotificationService({
        courseId:session.courseId,
        liveSessionId:sessionId,
        title:session.title
     })

    // return 
    return session;
}


// ============= COMPLETED LIVE SESSION ================
export const completeLiveSessionService = async (sessionId) =>{
    
    // check sessionId is required
    if(!sessionId){
        throw new ApiError(
            200,
            "sessionId is required!"
        );
    };

    // find and update by id live session status to completed
    const session = await LiveSession.findByIdAndUpdate(
        sessionId.trim(),
        {
            sessionStatus:"COMPLETED",
            completedAt: new Date()
        },
        {
            new:true,
            runValidators:true
        }
    );

    // chek session is updated if not throw error
    if(!session){
        throw new ApiError(
            500,
            "Failed to update session to completed!"
        );
    };

    // Push notification
    await NotificationService.endLiveSessionNotificationService({
        courseId:session.courseId,
        title:session.title,
        liveSessionId:sessionId
    });

    // return
    return session;
}

// ================ DELETE LIVE SESSION ===============
export const deleteLiveSessionService  = async (sessionId)=>{

    // check sessionId is available
    if(!sessionId){
        throw new ApiError(
            400,
            "sessionId is required!"
        );
    };

    //find and update delete status to true
    const session = await LiveSession.findByIdAndUpdate(
        sessionId.trim(),
        {
            isDeleted:true,
            deletedAt:new Date()
        },
        {
            new:true,
            runValidators:true
        }
    );

    // check deleted or mot if ot thrr in err
    if(!session){
        throw new ApiError(
            500,
            "failed to delete session!"
        );
    };

    // return
    return session;

}

// =========== GET ALL DELETED SESSION ====================
export const getAllDeletedSessionService = async () =>{

    // find deleted session from schema through the field isDeleted
    const session = await LiveSession.find(
        {
            isDeleted:true
        }
    );

    // check successfully found if not give error
    if(!session){
        throw new ApiError(
            500,
            "No deleted documents found!"
        );
    };

    // return 
    return session;

}