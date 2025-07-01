import nodemailer from "nodemailer";
import HttpError from "./HttpError.js";

const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, EMAIL_FROM, BASE_URL } = process.env

const config = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);


export const sendEmail = async (data) => {
    const emailOptions = {
    ...data,
    from: `Contacts Api ${EMAIL_ADDRESS}`,
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


