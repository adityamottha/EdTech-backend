import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js"
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { loginUserService, logoutUserService, registerUserService } from "./authUser.service.js";

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
        new ApiResponse(
            200,
            {
            userData:user,
            refreshToken:refreshToken,
            accessToken:accessToken
            },
        "User Logged in successfully!"
    )
    )
});

// LOGOUT-CONTROLLER--------------------------------------
const logOutUserController = AsyncHandler(async (req,res)=>{
    // get user id from req.user
    const userId = req.user._id;

    // call service function and pass the id
    const logoutUser = await logoutUserService(userId);

    // set options
    const options ={
      httpOnly:true,
      secure:false
   }

    // return response and clear cookies
    return res.status(200)
    .clearCookie("refreshToken",options)
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(200,logoutUser,"User loggedOut!")
    )
});

export { 
    registerUserController,
    loginUserController
 };