import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js"
import { getTeacherApplicationRequestController } from "./admin.controller.js";

const router = Router();

router.route("/applications").post(
    verifyJWT,
    authorizeRole("Admin"),
    getTeacherApplicationRequestController
);

export default router;