import { sendOtpService, verifyOtpService } from "../services/otp.service.js";

export const sendOtp = async (req, res, next) => {
  try {
    await sendOtpService(req.body.phone);
    res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    await verifyOtpService(req.body.phone, req.body.otp);
    res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};
