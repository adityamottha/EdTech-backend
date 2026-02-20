import { Router } from "express";
import { loginUserController, registerUserController } from "./authUser.controller.js";

const router = Router();

router.route("/register").post(registerUserController);

// LOGIN ROUTER 
router.route("/login").post(loginUserController)
export default router;
