import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema } from "../schemas/authSchemas.js";
import {
    getCurrentUser,
    loginController,
    registerController,
    logoutController
    
} from "../controllers/authControllers.js";
 
import authenticate from "../middlewares/authenticate.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema),registerController)

authRouter.post(
  "/login",
  validateBody(authRegisterSchema),
  loginController
);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.post("/logout", authenticate, logoutController)

export default authRouter