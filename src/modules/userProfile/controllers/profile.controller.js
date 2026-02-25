import { AsyncHandler } from "../../../utils/AsyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js"

const profileController = AsyncHandler(async (req,res)=>{
    // get all data from req.body
    // get service function and pass-data,
    // send response 
    return res.status(200).json(
        new ApiResponse(200,{},"Profile completed.")
    )
});

export { profileController }