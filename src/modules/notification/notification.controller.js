import { AsyncHandler } from "../../utils/AsyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { getAllNotificationsService } from "./notification.service.js";

// ================ GET USER ALL NOTOFICATION ==============
export const getAllNotificationController = AsyncHandler(async (req,res) =>{

    // find userId from req.user
    const userId = req.user?._id;

    // call service worker 
    const notification = await getAllNotificationsService(userId);

    // response
    return  res.status(200).json(
        new ApiResponse(
            200,
            notification,
            "All notifications fetched."
        )
    );
});