// import { AsyncHandler } from "../../utils/AsyncHandler.js";
// import { ApiResponse } from "../../utils/ApiResponse.js"
// import { courseEnrollmentService } from "./enrollment.service.js";

// // ========================ENROLLMENT =======================
// export const courseEnrollmentController = AsyncHandler(async (req,res)=>{

//     // get studentId
//     const studentId = req.user?._id;

//     // get courseId
//     const { courseId } = req.params;


//     // call service function and pass parameters
//     const enrollment = await courseEnrollmentService(studentId,courseId);

//     // response
//     return res.status(200),json(
//         new ApiResponse(200,enrollment, "Enrolled course succesfully")
//     );

// })