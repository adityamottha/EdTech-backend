import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js"

// config cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadFileOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });

        console.log("FILE UPLOADED ON CLOUDINARY", response.secure_url)

        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
    } catch (error) {
        console.log("CLOUDINARY FAILED TO UPLOAD",error?.message);
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
    }
}

const uploadMultipleFileOnCloudinary = async (files =[])=>{
    if(!files.length){
        throw new ApiError(400,"No files received!");
    }
const urls = []

for (const file of files) {
    const uploaded = await uploadFileOnCloudinary(file.path);
    if(!uploaded || !uploaded?.secure_url){
        throw new ApiError(500,"Failed to upload files!")
    }
    urls.push(uploaded.secure_url);
}

return urls;
}


export {
    uploadFileOnCloudinary,
    uploadMultipleFileOnCloudinary
}
