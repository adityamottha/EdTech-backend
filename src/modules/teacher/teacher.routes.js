import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { teacherApplicationController } from "./teacher.controller.js";

const router = Router();

router.route("/teacher-application").post(verifyJWT,teacherApplicationController);

export default router;