import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import { sendEmail } from "../helpers/sendEmail.js";
import { nanoid } from "nanoid";
import { verifyToken } from "../helpers/jwt.js";

const { JWT_SECRET } = process.env;
const BASE_URL = process.env.BASE_URL;

export const findUser = query => User.findOne({
    where: query,
})

export const sendVerificationEmail = async (to, verificationToken) => {
  const verifyLink = `${BASE_URL}/api/auth/verify/:${verificationToken}`;
  const message = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Please, verify your email",
    html: `<p>Для підтвердження email перейдіть за <a href="${verifyLink}">посиланням</a></p>`,
  };
  return sendEmail(message)

};

export const registerUser = async payload => {
  const { email, password } = payload;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const verificationToken = nanoid()

  const avatarURL = gravatar.url(email, { s: "250", d: "robohash" }, true);

  await sendEmail(sendVerificationEmail(verificationToken, email))

  return User.create({ ...payload, password: hashedPassword, avatarURL, verificationToken});
};

export const verifyEmail = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, "No found");
  }
  return await user.update(
    { isVerified: true, verificationToken: null },
    { returning: true }
  );
};

export const resendVerificationEmail = async (email) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  if (user.isVerified) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(sendVerificationEmail(user.verificationToken, email));
};
  

export const loginUser = async (payload = {}) => {
  const { email, password } = payload;
  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, existingUser.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const tokenPayload = {
    id: existingUser.id,
  };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "24h" });
    existingUser.token = token
    await existingUser.save()
    

    
  return {
    token,
    user: existingUser,
  };
};

export const logoutUser = async (userId) => {
  const user = await findUser({ id: userId });
  if (!user || !user.token) {
    throw HttpError(401, "Not found");
  }
  
  await user.update({ token: null });
};

export const updateSubscription = async (userId, subscription) => {
  const user = await findUser({ id: userId });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  await user.update({ subscription });
  return user;
};

export const updateAvatar = async (userId, avatarURL) => {
  const user = await findUser({ id: userId });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  await user.update({ avatarURL });
  return user;
};

