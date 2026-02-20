import { Router } from "express";
import { registerUserController } from "./authUser.controller.js";

const router = Router();

router.route("/register").post(registerUserController);

export default router;
