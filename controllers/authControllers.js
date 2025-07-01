import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js"
import { rootDir } from "../utils/dirname.js";
import { saveAvatarToPublic } from "../helpers/saveAvatarFiles.js";

export const registerController = ctrlWrapper(async (req, res) => {
    const  newUser  = await authServices.registerUser(req.body);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarUrl: newUser.avatarURL,
      },
    });

    
})

export const loginController = ctrlWrapper(async (req, res) => {
    const { token, user } = await authServices.loginUser(req.body);
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarUrl: user.avatarURL,
      },
    });
});

export const getCurrentUser = ctrlWrapper(async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({
    email,
    subscription,
    avatarURL,
  });
});

export const logoutController = ctrlWrapper(async (req, res) => { 
    const { id } = req.user;
    await authServices.logoutUser(id);
    res.status(204).send();
});

export const updateUserSubscription = ctrlWrapper(async (req, res) => {
    const { id } = req.user;
    const { subscription } = req.body;
    const updatedUser = await authServices.updateSubscription(id, subscription);
    res.json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
});

export const updateUserAvatar = ctrlWrapper(async (req, res) => {
  const { id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const tempUploadPath = req.file.path;
  const originalName = req.file.originalname

  const avatarURL = await saveAvatarToPublic(id, tempUploadPath, originalName);
  const updatedUser = await authServices.updateAvatar(id, avatarURL);
  res.json({
    avatarURL
  });
});

export const verifyUserEmail = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  await  authServices.verifyEmail(verificationToken);

  res.status(200).json({ message: "Verification successful" });
});

export const resendVerificationEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerificationEmail(email);
  res.json({
    message: "Verification email sent",
  });
});