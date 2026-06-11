import { Course } from "../models/course.model.js";
import { ApiError } from "../../../utils/ApiError.js"
import { AuthUser } from "../../auth/authUser.model.js"
import { uploadFileOnCloudinary } from "../../../utils/cloudinary.js";

const createCourseService = async (
      title,
      description,
      thumbnail,
      price,
      duration,
      level,
      language,
      instructorId
    ) =>{

            // console.log ("DESCRIPTION :", description)
            // console.log ("TITLE :", title)

        // All data is required
       if (!title) throw new ApiError(400, "Title is required!");
       if (!description) throw new ApiError(400, "Description is required!");
       if (!thumbnail) throw new ApiError(400, "Thumbnail is required!");
       if (!price) throw new ApiError(400, "Price is required!");
       if (!duration) throw new ApiError(400, "Duration is required!");
       if (!level) throw new ApiError(400, "Level is required!");
       if (!language) throw new ApiError(400, "Language is required!");

       // upload thumbnail on cloudinary 
       console.log("THUMBNAIL PATH:", thumbnail);
console.log("TYPE:", typeof thumbnail);
       
       const uploadThumbnail = await uploadFileOnCloudinary(thumbnail);
    //    console.log("THUMBNAIL_SECURE_URL :" ,!uploadThumbnail?.secure_url );
    //    console.log("THUMBNAIL :" ,!uploadThumbnail?.secure_url );
       
       if(!uploadThumbnail?.secure_url) throw new ApiError(500,"Thumbail failed to upload!")

        // find instructor 
        const instructor = await AuthUser.findById(instructorId);
        if(!instructor) throw new ApiError(404,"Instructor not found");

        // create course
        const createCourse = await Course.create({
            title,
            description,
            thumbnail:uploadThumbnail.secure_url,
            price,
            duration,
            level,
            language,
            instructor:instructorId
        }); 

        // return
        return createCourse
        
}

export { createCourseService }