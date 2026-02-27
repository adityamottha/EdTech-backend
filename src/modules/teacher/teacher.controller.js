import { AsyncHandler } from "../../utils/ApiResponse.js";
import { teacherApplicationService } from "./services/teacherApplication.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const teacherApplicationController = AsyncHandler(async (req,res)=>{
    // get userId from user
    const userId = req.user?._id;

    // get data from req.body
    const specialization = req.body;

    const qualification = req.body.qualification? JSON.parse(req.body.qualification) : null;

    // call the service function
    const application = await teacherApplicationService({
        userId,
        specialization,
        qualification
    });

    // return response 
    return res.status(200).json(
        new ApiResponse(200,application,"Application has been submitted!")
    );
});

export { teacherApplicationController }