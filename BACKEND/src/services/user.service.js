import User from "../models/user.model.js"

export const createUserService = async (phone) => {
    let user = await User.findOne({ phone });
    if (!user) {
        user = await User.create({ phone });
    }

    return user;
};

export const getMeService = async (userId) => {
    return await User.findById(userId);
};

export const updateProfileService = async (userId, data) => {
    const allowedFileds = ["name", "email", "avatar"];

    const updateData = {};
    for (const field of allowedFileds) {
        if (data[field] !== undefined) {
            updateData[field] = data[field];
        }

    }

    updateData.profileCompleted = true;

    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    );

    return user;
}