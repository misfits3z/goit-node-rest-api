import nodemailer from "nodemailer";
import HttpError from "./HttpError.js";

const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, EMAIL_FROM } = process.env

const config = {
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: true, 
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);


export const sendEmail = async (data) => {
    const emailOptions = {
    ...data,
    from: `Contacts Api <${EMAIL_FROM}>`,
  };
  try {
    const result = await transporter.sendMail(emailOptions);
    return result;
  } catch (error) {
    console.error("SendMail error:", error);
    throw HttpError(
      500,
      "Verification email sending failed. Please request email re-sending."
    );
  }}


