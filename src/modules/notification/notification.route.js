import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
import { getAllNotificationController } from "./notification.controller.js";

const router = Router();

// GET ALL NOTIFICATION

router.get('/',
 verifyJWT,
  getAllNotificationController 
)

export default router;