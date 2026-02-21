import { AuthUser } from "../modules/userAuth/authUser.model.js";
import { ApiError } from "./ApiError.js";

const generateAccessAndRefreshTokens = async (userId) =>{

    try {
        // check userId is required
        if(!userId) throw new ApiError(400,"UserId is required!");
    
        // find user by userId
        const user = await AuthUser.findById(userId);
        if(!user) throw new ApiError(404,"User dont have an account!")

        // generate access and refres token in user
        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()
    
        // return
        return { refreshToken, accessToken}

    } catch (error) {
        console.log("JWT TOKEN ERROR :- ", error);
        throw new ApiError(500, error?.message || "FAILED TO GENERATE TOKENS!");
        
    }
}

export { generateAccessAndRefreshTokens }