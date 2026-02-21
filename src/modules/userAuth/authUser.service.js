import { AuthUser } from "./authUser.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { generateAccessAndRefreshTokens } from "../../utils/AcceReffTokens.js";

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

// LOGIN-SERVICE-----------------------------
const loginUserService = async({identifier,password})=>{

    // check each fields are required
    if(!identifier?.trim()){
        throw new ApiError(400,"Email and PhoneNumber is required!");
    };
    if(!password?.trim()){
        throw new ApiError(400,"Password is required!");
    };

    // detect email 
    const isEmail = identifier.includes("@");

    // run query 
    const query = isEmail ? {email:identifier.toLowerCase()} : {phoneNumber:identifier}

    // find user by email and phoneNumber
    const user = await AuthUser.findOne(query).select("+password");

    if(!user) throw new ApiError(409,"User is not registered!");

    // compare password
    const isValidPassword = await user.isPasswordCorrect(password)
    if(!isValidPassword){
        throw new ApiError(400,"Incorrect password!");
    };

    // generate tokens 
    const {refreshToken, accessToken} = await generateAccessAndRefreshTokens(user._id);
    
    // increase login count and login at and inscrease number of token
    user.lastLoginAt = new Date();
    user.loginCount += 1;
  
    await user.save();
    // return use
    return {user,refreshToken,accessToken};

}

// LOGOUT-SERVICE---------------------------
const logoutUserService = async (userId) =>{

// check user id is not empty 
if(!userId) throw new ApiError(402,"UserId is required")

// find user by is and update inc refreshToken version
await AuthUser.findOneAndUpdate(userId,{$inc:{refreshTokenVersion: 1}});

// return true 
return true;

}

export {
     registerUserService,
     loginUserService,
     logoutUserService
 }