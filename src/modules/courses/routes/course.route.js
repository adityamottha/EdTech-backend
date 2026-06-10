import { Router } from "express";
import { verifyJWT } from "../../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../../middlewares/authorizeRole.middleware.js";
import { createCourseController } from "../controllers/course.controller.js";

const router = Router();

router.route("/create-course").post(
    verifyJWT, 
    authorizeRole("Teacher","Admin"),
    createCourseController
);

export default router