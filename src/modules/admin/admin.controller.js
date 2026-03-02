import { approvedTeacherService, createUserService, getTeacherApplicationRequestService, rejectApplicationService } from "./admin.service.js";
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

// APPORVED TEACHER APPLICATATION STATUS

const approvedTeacherController = AsyncHandler(async (req,res)=>{
    // get userId from req.body
    const userId = req.body.userId;

    // call the service function pass userId
    const teacher = await approvedTeacherService({userId});

    // send response 
    return res.status(200).json(
        new ApiResponse(200,teacher,"Approved Teacher successfully..")
    );

});


// REJECTED-APPLICATION---------------------
const rejectApplicationController = AsyncHandler(async (req,res)=>{
    // get userId and reason from req.body
    const {userId,reason} = req.body;

    // call service function pass parameters
    const rejectedUser = await rejectApplicationService({userId,reason});

    // send response 
    return res.status(200).json(
        new ApiResponse(200,rejectedUser,"Rejected application")
    );
    
});

// CREATED-USER-BY-ADMIN-----------------
const createUserController = AsyncHandler(async (req,res)=>{
    // get all data from req.body
    const {email,password,role} = req.body;

    // call service function and pass parameter
    const user = await createUserService({email,password,role});

    // return response 
    return res.status(200).json(
        new ApiResponse(200,user,"User register by ADMIN successfully!")
    );
});

export { 
    getTeacherApplicationRequestController,
    approvedTeacherController,
    rejectApplicationController,
    createUserController
 }