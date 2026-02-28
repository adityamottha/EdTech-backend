import { getTeacherApplicationRequestService } from "./admin.service.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js"

const getTeacherApplicationRequestController = AsyncHandler(async (req,res)=>{
    // call service function 
    const applications = await getTeacherApplicationRequestService();

    // send response 
    return res.status(200).json(
        new ApiResponse(200,applications,"All applications successfully fetched")
    );
});

export { getTeacherApplicationRequestController }