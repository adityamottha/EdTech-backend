import { Router } from "express";
import { loginUserController, logOutUserController, refreshAccessTokenController, registerUserController } from "./authUser.controller.js";
import { verifyJWT } from "../../middlewares/verifyJWT.middleware.js";
const router = Router();

router.route("/register").post(registerUserController);

// LOGIN ROUTER 
router.route("/login").post(loginUserController)

// LOGOUT ROUTE 
router.route("/logout").post(verifyJWT,logOutUserController)

// REFRESH ACCESS TOKEN 
router.route("/refresh-access-token").post(verifyJWT,refreshAccessTokenController)
export default router;
