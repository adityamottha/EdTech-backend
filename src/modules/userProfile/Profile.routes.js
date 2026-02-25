import { Router } from "express";
import { profileController } from "./controllers/profile.controller.js"
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";

const router = Router();

router.route("/profile").post(verifyJWT,profileController)

export default router;