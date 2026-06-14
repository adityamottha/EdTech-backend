import { Router } from "express";
import { profileController, updateProfileController } from "./controllers/profile.controller.js"
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.route("/common-profile").post(
    verifyJWT,
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ]),
    profileController)

    // ================UPDATE PROFILE ROUTER 
    router.patch("/update-profile",verifyJWT,updateProfileController)

export default router;