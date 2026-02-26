import { AsyncHandler } from "../../../utils/AsyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js"
import { profileService } from "../services/profile.service.js";
import { json } from "express";

const profileController = AsyncHandler(async (req,res)=>{
    // find user_id from logged in user 
    const userId = req.user?._id;

    // find avatar from files 
    const avatar = req.files?.avatar?.[0]?.path;

    //address and social-links find and convert to json
    const address = req.body.address? JSON.parse(req.body.address) : null;
    const socialLinks = req.body.socialLinks? JSON.parse(req.body.socialLinks) : null;

    // get all data from req.body
     const {
        firstName,lastName,phoneNumber,
        dateOfBirth,bio,timezone
    } = req.body;

    // get service function and pass-data,
    const profile = profileService({
        userId,firstName,lastName,
        phoneNumber,avatar,dateOfBirth,
        bio,address,timezone,socialLinks
    })
    // send response 
    return res.status(200).json(
        new ApiResponse(200,profile,"Profile completed.")
    )
});

export { profileController }