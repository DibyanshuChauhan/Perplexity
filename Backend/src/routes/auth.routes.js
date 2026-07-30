import { Router } from "express";
import {
    getMe,
    loginController,
    registerController,
    verifyEmail,
    resendVerificationEmail,
    logoutController
} from "../controllers/auth.controller.js";
import {
    loginValidator,
    registerValidator,
} from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerController);

authRouter.get("/verify-email", verifyEmail);

authRouter.post("/login", loginValidator, loginController);

authRouter.post("/logout", logoutController);

authRouter.get("/get-me", authUser, getMe);

authRouter.post("/resend-verification", resendVerificationEmail);

export default authRouter;
