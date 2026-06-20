import { Router } from "express";
import { createLiveSessionController } from "./liveSession.controller.js";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js";

const router = Router();

router.post(
    "/:courseId",
    verifyJWT,
    authorizeRole("Admin","Teacher"),
    createLiveSessionController
)


export default router;