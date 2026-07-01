import { Enrollment } from "./enrollment.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { Course } from "../courses/models/course.model.js"
import NotificationService from "../notification/notification.service.js"

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

    // send notification of enrolled course 
    try {
      await NotificationService.courseEnrollementNotificationService(courseId,studentId);
    } catch (error) {
      console.log("FAILED TO SEND ENROLLEMENT NOTIFICATION: ",error?.message)
    }

    // return 
    return createEnrolled;
}

// ===================== GET MY ENROLLED COURSE ==============================
export const getMyEnrolledCourseService  = async (studentId) =>{
    // student id is required
    if(!studentId){
        throw new ApiError(400,"StudentId is required!");
    };

    // find enrolled course and populate courseId 
    const existedEnrolled = await Enrollment.find({studentId}).populate(
        "courseId",
        "title description thumbnail price level language duration"
    );
    
    // check is enrolled already 
    if(!existedEnrolled.length){
        throw new ApiError(404,"No enrolled course found!");
    };

    // send response 
    return existedEnrolled;
};


// ================= CHECK IF ENROLLED =====================
export const checkEnrollmentService = async (studentId,courseId) => {

    // check studentId and courseId avaiable 
  if (!studentId) {
    throw new ApiError(
      400,
      "StudentId is required"
    );
  }

  if (!courseId) {
    throw new ApiError(
      400,
      "StudentId is required"
    );
  }

// Find if student enrolled 
  const enrollment = await Enrollment.findOne({
    studentId,
    courseId,
  });

//   if not through error
  if(!enrollment){
    throw new ApiError(
        404,
        "Enrolled course first!"
    )
  };

  return enrollment;
}; 


// =============== GET STUDENT WHO ENROLLED COURSE (FOR TECHER AND ADMIN)======
export const getCourseStudentsService = async (courseId) => {

    // thrr err if courseId is not available
  if (!courseId) {
    throw new ApiError(
      400,
      "CourseId is required!"
    );
  }
   
  // find course from enrollement with student+course
  const students = await Enrollment.find({
    courseId,
    status: "Active",
  }).populate({
  path:"studentId",
  select:"email",
  populate:{
    path:"profileId",
    select:"firstName lastName avatar"
  }
});

// check is no student there
  if (!students.length) {
    throw new ApiError(
      404,
      "No students enrolled in this course!"
    );
  }

//   return
  return students;
};