import { ApiResponse } from "../../../utils/ApiResponse.js"
import { createCourseService, deleteCourseService, getAllDraftCourses, getAllPublicCourseService, getDetetedCourseService, restoreDeletedCourseService, updateCourseService, updateThumbnailService } from "../services/course.service.js"
import { AsyncHandler } from "../../../utils/AsyncHandler.js"
import { ApiError } from "../../../utils/ApiError.js";


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

});

// ========================== UPDATE COURSE CONTROLLER =================
const updateCourseController = AsyncHandler(async (req,res) =>{

  // get courseId from params
  const {courseId} = req.params

  // get data from req.body 
  const data = req.body

  // call service function and pass parameters 
  const course = await updateCourseService(courseId,data);

  // response 
  return res.status(200).json(
    new ApiResponse(
      200,
      course,
      "Updated field of the course"
    )
  )
});

// ============================UPDATE THUMBNAIL CONTROLLER
const updateThumbnailController = AsyncHandler(async (req,res)=>{
  // find course id from params 
  const { courseId } = req.params

  // get thumbnail from req.body
  const thumbnail = req.files?.thumbnail?.[0]?.path
  console.log("THUMBNAIL",thumbnail);
  

  // call service function and pass parameters
  const updateThumbnail = await updateThumbnailService(courseId,thumbnail);

  // response 
  return res.status(200).json(
    new ApiResponse(
      200,
      updateThumbnail,
      "Thumbnail updated succesfully!"
    )
  )

});


// ================ DELETE COURSE ==============================

const deleteCourseController = AsyncHandler(async (req,res)=>{
  // get courseId from params
  const {courseId} = req.params;

  // call service function and pass parameters
  const isDeleted = await deleteCourseService(courseId);

  // response 
  return res.status(200).json(
    new ApiResponse(
    200,
    isDeleted,
    "Course moved to trash!"
    )
  )
});

// =================== GET DELETED COURSE ==========================

const getDetetedCourseController = AsyncHandler(async (req,res)=>{

  // call service function and pass parameters
  const getDeleted = await getDetetedCourseService();

  // response 
  return res.status(200).json(
    new ApiResponse(
      200,
      getDeleted,
      "All deleted courses Fetched!"
    )
  )
});

// =========================== RESTORE DELETED COURSES ==================
const restoreDeletedCourseController = AsyncHandler(async (req,res)=>{

  // get courseId to params
  const {courseId} = req.params;

  // call service function and pass parameters
  const restore = await restoreDeletedCourseService(courseId)

  // return response 
  return res.status(200).json(
    new ApiResponse(
      200,
      restore,
      "Restored deleted course"
    )
  )
})

export { 
  createCourseController,
  getAllPublicCoursController,
  getAllDraftCoursController,
  updateCourseController,
  updateThumbnailController,
  deleteCourseController,
  getDetetedCourseController,
  restoreDeletedCourseController
}