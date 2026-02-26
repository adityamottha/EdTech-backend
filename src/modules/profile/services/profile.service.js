import { ApiError } from "../../../utils/ApiError.js";
import { Profile } from "../models/profile.model.js";
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

    if(!timezone?.trim()) throw new ApiError(400,"timezone is required!");
    if(!socialLinks) throw new ApiError(400,"Social links are required!")
    
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
    profileCompleted:true
   });
   
 // return

 return profile;
}

export { profileService }