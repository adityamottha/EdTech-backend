import { AuthUser } from "./authUser.model.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshTokens } from "../../utils/AcceReffTokens.js";

const registerUserService = async ({email,password}) =>{

    // check is user details are not empty
    if(!email?.trim()) throw new ApiError(400,"Email is required!");
    if(!password?.trim()) throw new ApiError(400,"Password is required");

    // check is user is not already in db
    const existedUser = await AuthUser.findOne({email:email.toLowerCase()});
    if(existedUser) throw new ApiError(409,"User already registered!");

    // create user
    const user = await AuthUser.create({
        email:email.toLowerCase(),
        password,
    });

    if(!user) throw new ApiError(500,"User failed to register!")
    
    // return user
    return user;
}

// LOGIN-SERVICE-----------------------------
const loginUserService = async({email,password})=>{

    // check each fields are required
    if(!email?.trim()){
        throw new ApiError(400,"Email and PhoneNumber is required!");
    };
    if(!password?.trim()){
        throw new ApiError(400,"Password is required!");
    };

    // find user by email and phoneNumber
    const user = await AuthUser.findOne({email}).select("+password");

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


// Access-token generting for continue login
const refreshAccessTokenService = async (incomingRefreshToken) => {

  // check token is available 
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request!");
  }

  // Verifies the incoming refresh token using secret key and decodes its payload
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  // console.log("tokenVersion",decodedToken);
  
  //find the user by userId and validate if user exist
  const user = await AuthUser.findById(decodedToken._id);
  if (!user) throw new ApiError(401, "Invalid refresh token");

//   console.log("tokenVersion",user.refreshTokenVersion);
  
  // check refresh-token is still valid by comaring token version
  if (decodedToken.refreshTokenVersion !== user.refreshTokenVersion) {
    throw new ApiError(401, "Refresh token expired or revoked");
  }

  // generate a new refresh and access token by id
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

    // return for controller 
  return { accessToken, refreshToken };
};

// CHANGE PASSWORD SERVICE--------------
const changePasswordService = async (userId,oldPassword,newPassword)=>{
  // check fields are not empty 
  if(!oldPassword.trim()) throw new ApiError(400,"Old password is required!");
  if(!newPassword.trim()) throw new ApiError(400,"New password is required!");
  if(!userId) throw new ApiError(400,"UserId is required!");

  // check new password must be diffrante from old one
  if(oldPassword === newPassword){
    throw new ApiError(403,"Password must be diffrante from old one!");
  };

  // find user by userId + password
  const user = await AuthUser.findOne(userId).select("+password");
  if(!user) throw new ApiError(409,"User not existed!");

  // compare password 
  const matchOldPassword = await user.isPasswordCorrect(oldPassword);
  if(!matchOldPassword) throw new ApiError(404,"Incorrect old password!");

  // change old password to new
  user.password = newPassword; 

  // update time of password change 
  user.passwordChangedAt = new Date();
 
  // update refresh token version 
  user.refreshTokenVersion += 1;

  // save user 
  await user.save();

  // return 
  return user;
};

export {
     registerUserService,
     loginUserService,
     logoutUserService,
     refreshAccessTokenService,
     changePasswordService
 }