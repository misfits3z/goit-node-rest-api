import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken"
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {

    const { authorization } = req.headers;
    console.log("AUTHORIZATION HEADER:", req.headers.authorization);
    if (!authorization) {
      return next(HttpError(401, "Not authorized"));
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      return next(HttpError(401, "Not authorized"));
    }

    const { payload, error } = verifyToken(token);
    if (error) {
      return next(HttpError(401, "Not authorized"));
    }
    const user = await findUser({ id: payload.id });
    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();






}

export default authenticate;