import { ApiResponse } from "../../utils/ApiResponse.js"
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { loginUserService, registerUserService } from "./authUser.service.js";

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
    // call service function and pass req.body 
    const {user,refreshToken,accessToken} = await loginUserService({
        identifier:req.body.identifier,
        password:req.body.password
    });

    // set cookies
    const options = {
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    }

    //send response
    return res.status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(200,{userData:user},refreshToken,accessToken)
    )
})
export { 
    registerUserController,
    loginUserController
 };