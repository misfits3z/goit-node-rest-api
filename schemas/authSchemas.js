import Joi from "joi";
import { emailRegexp, passwordRegexp } from "../constants/auth.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string()
    .min(8)
    .max(24)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 24 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
    }),
});

export const authVerifySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
  }),
});