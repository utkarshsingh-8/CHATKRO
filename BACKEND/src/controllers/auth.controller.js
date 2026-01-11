import { loginService } from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const token = await loginService(req.body.phone);
    res.json({ success: true, token });
  } catch (e) {
    next(e);
  }
};
