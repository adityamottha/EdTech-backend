import { ApiError } from "../utils/ApiError.js";

const authorizeRole = (role) =>{
    return (req,res,next) =>{

        // check user.role is existed in req if not throw error
        if(!req.user.role){
            throw new ApiError(401,"Unauthorized request!");
        };

        // check role is same req attached user if not throw error
        if(req.user.role !== role){
            throw new ApiError(403,`${req.user.role} is not allow to access this api!`);
        }

        next();
    }
}

export { authorizeRole }