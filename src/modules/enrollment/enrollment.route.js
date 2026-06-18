import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js";
import { checkEnrollmentController, courseEnrollmentController, getMyEnrolledCourseController } from "./enrollment.controller.js";
import { isProfileCompleted } from "../../middlewares/isProfileCompleted.middleware.js";

const router = Router();

// ==========ENROLLMENT COURSE============
router.post("/:courseId",verifyJWT,authorizeRole("Student"),isProfileCompleted,courseEnrollmentController);

// ==========GET MY ENROLLED COURSES=========
router.get("/my-enrolled-courses",verifyJWT,authorizeRole("Student"),getMyEnrolledCourseController);

// =============== CHECK ENROLLMENT ROUTER =============
router.get(
  "/check/:courseId",
  verifyJWT,
  authorizeRole("Student"),
  checkEnrollmentController
);

export default router