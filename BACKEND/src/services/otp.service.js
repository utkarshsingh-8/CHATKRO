import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { AppError } from "../utils/appError.js";
import { env } from "../config/env.js";
import jwt from "jsonwebtoken";

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
    if (!record) {
        throw new AppError("Invalid or expired OTP", 401);
    }

    const user = await User.findOneAndUpdate(
        { phone },
        {
            $set: { isVerified: true },
            $setOnInsert: { profileCompleted: false }
        },
        { new: true, upsert: true }
    );

    await OTP.deleteMany({ phone });

    if (!env.jwt_secret) {
        throw new AppError("JWT secret is not configured", 500);
    }

    const token = jwt.sign(
        { userId: user._id },
        env.jwt_secret,
        { expiresIn: "7d" }
    );

    return token;
};