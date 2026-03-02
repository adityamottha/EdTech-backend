import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js"
import { approvedTeacherController, getTeacherApplicationRequestController, rejectApplicationController } from "./admin.controller.js";

const router = Router();

router.route("/applications").get(
    verifyJWT,
    authorizeRole("Admin"),
    getTeacherApplicationRequestController
);

// APPROVED APPLICATION STATUS --------------------
router.route("/approved-teacher").patch(
    verifyJWT,
    authorizeRole("Admin"),
    approvedTeacherController
);

// REJECT APPLICATION STATUS ---------------------
router.route("/reject-application").patch(
    verifyJWT,
    authorizeRole("Admin"),
    rejectApplicationController
)


export default router;