import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { registerUserService } from "./authUser.service.js";

const registerUserController = AsyncHandler(async ()=>{
    // get a data from req.body
    // call the service function and pass parameter
    // return response
});

export { registerUserController }