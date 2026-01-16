import { getMeService, updateProfileService } from "../services/user.service.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.body.phone);
    res.status(201).json({ success: true, data: user });
  } catch (e) {
    next(e);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await getMeService(req.user.userId);
    res.status(200).json({ success: true, data: user });
  } catch (e) {
    next(e);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await updateProfileService(req.user.userId, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (e) {
    next(e);
  }
};
