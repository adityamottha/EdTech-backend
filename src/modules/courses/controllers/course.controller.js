import { ApiResponse } from "../../../utils/ApiResponse.js"
import { createCourseService, getAllDraftCourses, getAllPublicCourseService } from "../services/course.service.js"
import { AsyncHandler } from "../../../utils/AsyncHandler.js"


// ==================== CREATE COURSE ==================
const createCourseController = AsyncHandler(async (req,res)=>{

    // get data from body 
    const { title,
      description,
      price,
      duration,
      level,
      language,
      isPublished
    } = req.body
     
    // console.log("req.files:", req.files);
    // console.log("req.body:", req.body);

    // get thumbail from file 
    const thumbnail = req.files?.thumbnail?.[0]?.path;
    
    // get userId from auth middleware
    const instructorId = req.user?._id;

    // get service function and pass parameters
    const course = await createCourseService(title,
      description,
      thumbnail,
      price,
      duration,
      level,
      language,
      instructorId,
      isPublished
    );

    return res.status(200).json(
        new ApiResponse(200,course,"Course created successully!")
    );
});

// ====================GET ALL PUBLISHED COURSE
const getAllPublicCoursController = AsyncHandler(async (req,res)=>{
   // call the service function 
  const publishedCourses = await getAllPublicCourseService();

  // send response 
  return res.status(200).json(
    new ApiResponse(
      200,
      publishedCourses,
      "Fetched all published courses"
    )
  );
});

const getAllDraftCoursController = AsyncHandler(async (req,res) =>{
  // call the service function 
  const draftCourses = await getAllDraftCourses();

  // return response 
  return res.status(200).json(
    new ApiResponse(200,draftCourses,"Fetched all draft courses !")
  );

})


export { 
  createCourseController,
  getAllPublicCoursController,
  getAllDraftCoursController
}