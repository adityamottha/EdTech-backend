import { ApiError } from "../utils/ApiError.js";

const isProfileCompleted = ()=>{
    return (req,_,next)=>{
        if(!req.user?.profileCompleted){
            throw new ApiError(409,"Pending profile status!")
        }
        next();
    }
}

export { isProfileCompleted }