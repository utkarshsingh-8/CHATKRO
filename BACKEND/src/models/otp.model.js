import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    phone: String,
    otp: String,
    expiresAt: Date
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("OTP", otpSchema);
