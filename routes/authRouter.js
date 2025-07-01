import express from "express";
import validateBody from "../helpers/validateBody.js";
import validateFile from "../helpers/validateFile.js";
import { authRegisterSchema, authVerifySchema } from "../schemas/authSchemas.js";
import {
  getCurrentUser,
  loginController,
  registerController,
  logoutController,
  updateUserAvatar,
  verifyUserEmail,
  resendVerificationEmail,
} from "../controllers/authControllers.js";
 
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";


const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(authRegisterSchema),
  registerController
);

authRouter.get(
  "/verify/:verificationToken",
  verifyUserEmail
);

authRouter.post(
  "/verify",
  validateBody(authVerifySchema),
  resendVerificationEmail
);

authRouter.post(
  "/login",
  validateBody(authRegisterSchema),
  loginController
);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.post("/logout", authenticate, logoutController)

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  validateFile,
  updateUserAvatar
);

export default authRouter