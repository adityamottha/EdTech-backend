import { Enrollment } from "./enrollment.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { Course } from "../courses/models/course.model.js"


// ==========================enrolled course ===================

export const courseEnrollmentService = async (studentId,courseId) =>{

    // check id's are required
    if(!studentId) throw new ApiError(400,"studentId is required!");
    if(!courseId) throw new ApiError(400,"courseId is required!");
    
    // check course exits
    const course = await Course.findById(courseId);
    if(!course) throw new ApiError(400,"course not found")

    // check if already enrolled
    const existingEnrolment = await Enrollment.findOne({studentId,courseId})
    if(existingEnrolment) throw new ApiError(409,"Already Enrolled course!")

    // create enrolled
    const createEnrolled = await Enrollment.create({
        studentId,
        courseId
    });

    return createEnrolled;
}

// ===================== GET MY ENROLLED COURSE ==============================
export const getMyEnrolledCourseService  = async (studentId) =>{
    // student id is required
    if(!studentId){
        throw new ApiError(400,"StudentId is required!");
    };

    // find enrolled course and populate courseId 
    const existedEnrolled = await Enrollment.findById(studentId).populate("courseId");
    if(!existedEnrolled){
        throw new ApiError(408,"No enrolled course found!");
    };

    // send response 
    return existedEnrolled;
}