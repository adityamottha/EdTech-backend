import { AuthUser } from "./models/authUser.model.js";
import { ApiError } from "../../utils/ApiError.js";

const registerUserService = async ({email,phoneNumber,password,role}) =>{

    // check is user details are not empty
    if(!email?.trim()) throw new ApiError(400,"Email is required!");
    if(!phoneNumber) throw new ApiError(400,"Phone-Number is required!");
    if(!password?.trim()) throw new ApiError(400,"Password is required");
    if(!role) throw new ApiError(400,"Role is required!");

    // check is user is not already in db
    const existedUser = await AuthUser.findOne({
        $or:[{email:email.toLowerCase()},{phoneNumber}]
    });
    if(existedUser) throw new ApiError(409,"User already registered!");

    // create user
    const user = await AuthUser.create({
        email:email.toLowerCase(),
        phoneNumber,
        password,
        role
    });

    if(!user) throw new ApiError(500,"User failed to register!")
    
    // return user
    return user;
}

export {registerUserService}