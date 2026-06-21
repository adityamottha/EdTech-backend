import { Router } from "express";
import { createLiveSessionController, getLiveSessionController } from "./liveSession.controller.js";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { authorizeRole } from "../../middlewares/authorizeRole.middleware.js";

const router = Router();

// POST LIVE SESSION ROUTE
router.post(
    "/:courseId",
    verifyJWT,
    authorizeRole("Admin","Teacher"),
    createLiveSessionController
)

// GET LIVE SESSION ROUTE
router.get(
    "/course/:courseId",
    verifyJWT,
    authorizeRole("Admin","Teacher","Student"),
    getLiveSessionController
)

export default router;