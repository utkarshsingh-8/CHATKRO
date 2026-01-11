import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { AppError } from "../utils/appError.js";

export const sendOtpService = async (phone) => {
    const otp = await generateOtp();
    await OTP.deleteMany({ phone });
    await OTP.create({
        phone,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    console.log(`📲 OTP for ${phone}: ${otp}`);
};

export const verifyOtpService = async (phone, otp) => {
    const record = await OTP.findOne({ phone, otp });
    if (!record) throw new AppError("Invalid OTP", 400);

    const user = await User.findOneAndUpdate({ phone }, { isVerified: true }, { new: true });
    if (!user) {
        throw new AppError("User not found", 404);
    }

    await OTP.deleteMany({ phone });
};