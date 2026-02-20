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
    if(!identifier?.trim){
        throw new ApiError(400,"Email and PhoneNumber is required!");
    };

    // find user by email and phoneNumber
    const user = AuthUser.findOne({
        $or:{email,phoneNumber}
    }).select("+password");

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
  
    // return use
    return {user,refreshToken,accessToken};

}

export {
     registerUserService,
     loginUserService
 }