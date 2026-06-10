import { ApiResponse } from "../../../utils/ApiResponse.js"
import { createCourseService } from "../services/course.service.js"
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
    } = req.body
     
    // get thumbail from file 
    const thumbnail = req.files?.thumbnail?.[0]?.path;

    console.log("THUMBNAIL :", thumbnail);
    
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
      instructorId
    );

    return res.status(200).json(
        new ApiResponse(200,course,"Course created successully!")
    );
});

export { createCourseController}