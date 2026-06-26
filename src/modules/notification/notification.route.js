import { verify } from "crypto";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware";
import { getAllNotificationController } from "./notification.controller";

const router = Router();

// GET ALL NOTIFICATION

router.get('/',
 verifyJWT,
  getAllNotificationController 
)

export default router;