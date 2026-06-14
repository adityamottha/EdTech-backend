import { Router } from "express";
import { getProfileController, profileController, updateProfileController } from "./controllers/profile.controller.js"
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
    profileController);

    // ===============GET PROFILE ROUTER============
    router.get("/get-common-profile",verifyJWT,getProfileController)

    // ================UPDATE PROFILE ROUTER ==========
    router.patch("/update-common-profile",verifyJWT,updateProfileController)

export default router;