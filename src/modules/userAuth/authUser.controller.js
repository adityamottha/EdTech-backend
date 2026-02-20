import { ApiResponse } from "../../utils/ApiResponse.js"
import { AsyncHandler } from "../../utils/AsyncHandler.js";
// import { registerUserService } from "./authUser.service.js";

const registerUserController = AsyncHandler(async (req,res)=>{
    // get a data from req.body
    // call the service function and pass parameter
    // return response
    return res.status(200).json(
        new ApiResponse(200,{},"User register successfully!")
    )
});

export { registerUserController }