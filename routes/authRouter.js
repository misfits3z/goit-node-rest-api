import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema } from "../schemas/authSchemas.js";
import {
    loginController,
    registerController
    
 } from "../controllers/authControllers.js";
const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema),registerController)

authRouter.post(
  "/login",
  validateBody(authRegisterSchema),
  loginController
);


export default authRouter