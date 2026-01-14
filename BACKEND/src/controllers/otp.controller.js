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
    const { phone, otp } = req.body;

    const token = await verifyOtpService(phone, otp);

    res.status(200).json({
      success: true,
      token
    });
  } catch (e) {
    next(e);
  }
};

