import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { AuthUser } from "../modules/userAuth/authUser.model.js";
import jwt from "jsonwebtoken"

const verifyJWT = AsyncHandler(async (req,res,next)=>{
    try {
    // get token from req.cookies
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized request!");

    // decoded token 
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // find user by decode._id
    const user = await AuthUser.findById(decoded._id).select("-password");
    if (!user) throw new ApiError(401, "Invalid Access token!");

    // attach user to req 
    req.user = user;
    
    next();

    } catch (error) {
    console.log("verifyJWT ERROR:- ", error.message);

    throw new ApiError(
      error.name === "JsonWebTokenError" ? 401 : 500,
      error.message
    );
    }
});

export { verifyJWT }