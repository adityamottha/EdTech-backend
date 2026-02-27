import { ApiError } from "../utils/ApiError.js";

const isProfileCompleted = (req,_,next)=>{
//     console.log("USER:", req.user);
// console.log("profileCompleted:", req.user?.profileCompleted);
        if(!req.user?.profileCompleted){
            throw new ApiError(409,"Pending profile status!")
        }
        next();
}

export { isProfileCompleted }