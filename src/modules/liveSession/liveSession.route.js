import { Router } from "express";
import { cancelLiveSessionController, completeLiveSessionController, createLiveSessionController, getLiveSessionController, startLiveSessionController, updateLiveSessionController } from "./liveSession.controller.js";
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

// UPDATE LIVE SESSION
router.patch(
    "/update/:sessionId",
    verifyJWT,
    authorizeRole("Admin","Teacher"),
    updateLiveSessionController
);

// START LIVE SESSION
router.patch(
    "/:sessionId/start",
    verifyJWT,
    authorizeRole("Admin","Teacher"),
    startLiveSessionController
);

// CANCEL LIVE SESSION
router.patch(
    "/:sessionId/cancel",
    verifyJWT,
    authorizeRole("Admin","Teacher"),
    cancelLiveSessionController
);

// COMPLETED LIVE SESSION
router.patch(
    "/:sessionId/end",
    verifyJWT,
    authorizeRole("Admin","Teacher"),
    completeLiveSessionController
);
