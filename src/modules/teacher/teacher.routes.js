import { Router } from "express";
import { isProfileCompleted } from "../../middlewares/isProfileCompleted.middleware.js";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { teacherApplicationController } from "./teacher.controller.js";

const router = Router();

router.route("/teacher-application").post(
    verifyJWT,
    isProfileCompleted,
    teacherApplicationController
);

export default router;