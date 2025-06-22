import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js"

export const registerController = ctrlWrapper(async (req, res) => {
    const  newUser  = await authServices.registerUser(req.body);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });

    
})

export const loginController = ctrlWrapper(async (res, req) => {
    const { token, user } = await authServices.loginUser(req.body);
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    })
});

export const getCurrentUser = ctrlWrapper(async (res, req) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
});

export const logoutController = ctrlWrapper(async (res, req) => { 
    const { id } = req.user;
    await authServices.logoutUser(id);
    res.status(204).send();
});

export const updateUserSubscription = ctrlWrapper(async (res, req) => {
    const { id } = req.user;
    const { subscription } = req.body;
    const updatedUser = await authServices.updateSubscription(id, subscription);
    res.json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
});