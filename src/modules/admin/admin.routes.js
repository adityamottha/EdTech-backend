import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js"
import { approvedTeacherController, getTeacherApplicationRequestController } from "./admin.controller.js";

const router = Router();

router.route("/applications").get(
    verifyJWT,
    authorizeRole("Admin"),
    getTeacherApplicationRequestController
);

router.route("/approved-teacher").patch(
    verifyJWT,
    authorizeRole("Admin"),
    approvedTeacherController
);

export default router;