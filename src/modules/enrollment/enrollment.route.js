import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js";
import { checkEnrollmentController, courseEnrollmentController, getCourseStudentsController, getMyEnrolledCourseController } from "./enrollment.controller.js";
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

// ======== GET STUDENTS WHO ENROLLED COURSE FOR TEACHER =============
router.get(
  "/:courseId/students",
  verifyJWT,
  authorizeRole("Teacher", "Admin"),
  getCourseStudentsController
);
export default router