import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js";
import { courseEnrollmentController } from "./enrollment.controller.js";

const router = Router();

// ==========ENROLLMENT COURSE============
router.post("/:courseId",verifyJWT,authorizeRole("Student"),courseEnrollmentController)

export default router