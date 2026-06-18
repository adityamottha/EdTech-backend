import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js"
import { checkEnrollmentService, courseEnrollmentService, getMyEnrolledCourseService } from "./enrollment.service.js";
import { response } from "express";

// ========================ENROLLMENT =======================
export const courseEnrollmentController = AsyncHandler(async (req,res)=>{

    // get studentId
    const studentId = req.user?._id;

    // get courseId
    const { courseId } = req.params;


    // call service function and pass parameters
    const enrollment = await courseEnrollmentService(studentId,courseId);

    // response
    return res.status(200).json(
        new ApiResponse(200,enrollment, "Enrolled course succesfully")
    );

});


// =========================GET MY COURSES=====================

export const getMyEnrolledCourseController = AsyncHandler(async (req,res) =>{

    // get studentId from req.user
    const studentId = req.user?._id

    // call service function and pass parameters
    const enrolled = await getMyEnrolledCourseService(studentId);

    // response 
    return res.status(200).json(
        new ApiResponse(200,enrolled,"Fetched all courses!")
    );
});


// ================= CHECK IF ENROLLED =====================

export const checkEnrollmentController = AsyncHandler(async (req, res) => {

    // get ids from req
  const studentId = req.user._id;
  const { courseId } = req.params;

//   call and pass argument to service funtion 
  const result = await checkEnrollmentService(
      studentId,
      courseId
    );

    // response 
  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Enrollment status fetched"
    )
  );
});