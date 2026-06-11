import { Router } from "express";
import { verifyJWT } from "../../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../../middlewares/authorizeRole.middleware.js";
import { createCourseController, getAllPublicCoursController } from "../controllers/course.controller.js";
import { upload } from "../../../middlewares/multer.middleware.js";

const router = Router();

// =============CREATE COURSE ROUTER==================
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

// ================== GET ALL PUBLISHED COURSE ROUTER
router.route("/all-published-courses").get(
    verifyJWT,
    authorizeRole("Student","Teacher","Admin"),
    getAllPublicCoursController
)
export default router