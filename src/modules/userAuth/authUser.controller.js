import { ApiResponse } from "../../utils/ApiResponse.js"
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { registerUserService } from "./authUser.service.js";

const registerUserController = AsyncHandler(async (req,res)=>{
    // get a data from req.body
    const {email,phoneNumber,password,role} = req.body;

    // call the service function and pass parameter
    const registerUser = await registerUserService({
        email,
        phoneNumber,
        password,
        role
    })
    // return response
    return res.status(200).json(
        new ApiResponse(200,registerUser,"User register successfully!")
    )
});

const loginUserController = AsyncHandler(async (req,res)=>{
    // get data from req.body
    // call service function
    // set cookies
    //send response
})
export { 
    registerUserController,
    loginUserController
 };