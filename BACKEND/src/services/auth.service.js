import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";

export const loginService = async (phone) => {
    const user = await User.findOne({ phone });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.isVerified) {
        throw new AppError("User not verified", 401);
    }

    const token = jwt.sign(
        { userId: user._id },
        env.jwt_secret,
        {
            expiresIn: "1h"
        }
    );

    return token;
};
