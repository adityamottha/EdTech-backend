import { Router } from "express";
import { verifyJWT } from "../../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../../middlewares/authorizeRole.middleware.js";
import { createCourseController } from "../controllers/course.controller.js";
import { upload } from "../../../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-course").post(
    verifyJWT, 
    upload.fields([
        {
            name:"thumbnail",
            maxCount:1
        }
    ]),
    authorizeRole("Teacher","Admin"),
    createCourseController
);

export default router