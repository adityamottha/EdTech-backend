import { Course } from "../models/course.model.js";
import { ApiError } from "../../../utils/ApiError.js"
import { AuthUser } from "../../auth/authUser.model.js"
import { uploadFileOnCloudinary } from "../../../utils/cloudinary.js";
// import { application } from "express";

const createCourseService = async (
    title,
    description,
    thumbnail,
    price,
    duration,
    level,
    language,
    instructorId,
    isPublished
) => {
    // All data is required
    if (!title) throw new ApiError(400, "Title is required!");
    if (!description) throw new ApiError(400, "Description is required!");
    if (!thumbnail) throw new ApiError(400, "Thumbnail is required!");
    if (!price) throw new ApiError(400, "Price is required!");
    if (!duration) throw new ApiError(400, "Duration is required!");
    if (!level) throw new ApiError(400, "Level is required!");
    if (!language) throw new ApiError(400, "Language is required!");
    if(!isPublished) throw new ApiError(400,"isPublished is required!")

    // upload thumbnail on cloudinary 
    const uploadThumbnail = await uploadFileOnCloudinary(thumbnail);
    
    if(!uploadThumbnail?.secure_url) {
        throw new ApiError(500, "Thumbnail failed to upload!");
    }

    // find instructor 
    const instructor = await AuthUser.findById(instructorId);
    if(!instructor) throw new ApiError(404, "Instructor not found");

    // create course
    const createCourse = await Course.create({
        title,
        description,
        thumbnail: uploadThumbnail.secure_url,
        price,
        duration,
        level,
        language,
        instructor: instructorId,
        isPublished
    }); 

    return createCourse;
}


// ===================GET ALL PUBLISHED COURSE=================

const getAllPublicCourseService = async () => {
  const courses = await Course.find({ isPublished: true });

  if (courses.length === 0) {
    throw new ApiError(
      404,
      "There are no published courses available!"
    );
  }

  return courses;
};

// ===========================ALL DRAFT COURSES====================
const getAllDraftCourses = async ()=>{
    // find courses that are not public
    const draftCourses = await Course.find({isPublished:false});

    // check if draft course available
    if(draftCourses.length == 0){
        throw new ApiError(404,"There are no Draft courses available!")
    };

    // return
    return draftCourses;

};


// ===================== COURSE UPDATE ============================
const updateCourseService = async (courseId,data) =>{

    // check userId
    if(!courseId) {
        throw new ApiError(
            400,
            "UserId is required!"
        )
    };

    //check data
    if(!data){
        throw new ApiError(
            400,
            "Data is required!"
        )
    }

    // find and update by courseId
    const course = await Course.findByIdAndUpdate(
        courseId,
        data,
       { 
        new: true,
        runValidators: true
       }
    );

    //check course available from given id
    if(!course){
        throw new ApiError(
            404,
            "Course not found!"
        )
    };

    // return
    return course

}

// ==========================UPDATE THUMBNAIL ==========================
const updateThumbnailService = async (courseId , newThumbnail) =>{
  // check both are available 
  if(!courseId){
    throw new ApiError(400,"courseId is required!")
  }

  if(!newThumbnail){
    throw new ApiError(400,"newThumbnail is required!")
  };

  // upload thumbnail on cloudinary 
  const uploadThumbnail = await uploadFileOnCloudinary(newThumbnail);
  if(!uploadThumbnail?.secure_url){
    throw new ApiError(500,"newThumbnail failed to upload on cloudiary!");
  };

  // find and update thmbnail
  const thumbnail = await Course.findByIdAndUpdate(
    courseId,
     {
        thumbnail: uploadThumbnail.secure_url
    },
    {
        new:true,
        runValidators:true
    }
  );

  // check course available

  if(!thumbnail){
    throw new ApiError(
        404,
        "Course not found!"
    )
  }

//   return 
  return thumbnail;
}

export { 
    createCourseService,
    getAllPublicCourseService,
    getAllDraftCourses,
    updateCourseService,
    updateThumbnailService
 }