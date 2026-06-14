import { ApiError } from "../../../utils/ApiError.js";
import { Profile } from "../models/profile.model.js";
import { AuthUser } from "../../auth/authUser.model.js";
import { uploadFileOnCloudinary } from "../../../utils/cloudinary.js";

const profileService = async ({
    userId,
    firstName,
    lastName,
    phoneNumber,
    avatar,
    dateOfBirth,
    bio,
    address,
    timezone,
    socialLinks
})=>{
    // check data is not empty

    if(!firstName?.trim()) throw new ApiError(400,"First-Name is required!");

    if(!lastName?.trim()) throw new ApiError(400,"Last-Name is required!");

    if(!phoneNumber?.trim()) throw new ApiError(400,"Phone-Number is required!");

    if(!avatar) throw new ApiError(400,"Avatar is required!");

    if(!dateOfBirth?.trim()) throw new ApiError(400,"dateOfBirth is required!");

    if(!bio?.trim()) throw new ApiError(400,"bio is required!");

    if(!address) throw new ApiError(400,"address is required!");

    // if(!timezone?.trim()) throw new ApiError(400,"timezone is required!");
    // if(!socialLinks) throw new ApiError(400,"Social links are required!")
    
    // find profile 
    const existedPofile = await Profile.findOne({userId});

    if(existedPofile){
        throw new ApiError(408,"User Already have profile!");
    }

    // upload avatar on cloudinary
    const uploadAvatar = await uploadFileOnCloudinary(avatar);
    if(!uploadAvatar?.secure_url){
        throw new ApiError(500,"Avatar failed to upload!");
    };

   // create profile
   const profile = await Profile.create({
    userId,
    firstName,
    lastName,
    phoneNumber,
    avatar:uploadAvatar.secure_url,
    dateOfBirth,
    bio,
    address,
    socialLinks,
    timezone,
   });
   
   // update field completed and time of profile 
   await AuthUser.findByIdAndUpdate(userId,{
    profileCompleted:true,
    profileCompletedAt: new Date()
   });
 
 // return
 return profile;
};

// ===========================GET PROFILE=============================

const getProfileService = async (userId)=>{

// find the profile through userId
const profile = await Profile.findById(userId);

// check profile is available
if(!profile){
    throw new ApiError(408,"Profile not found!");
};

// return profile 
return profile;

}


// ====================== UPDATE PROFILE SERVICE ======================

const updateProfileService = async (userId,data)=>{
    // check all fields are required
    if(!userId){
        throw new ApiError(400,"userId is required");
    };

    if(!data.trim()){
        throw new ApiError(400,"Data is required!");
    };

    // find and update through set 
    const profile = await Profile.findOneAndUpdate(
        {userId},
        {$set:data},
        {new:true},
    );

    // return profile 
    return profile
}

export {
 profileService,
 updateProfileService,
 getProfileService
}