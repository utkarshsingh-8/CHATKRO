import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";

export const createConversationService = async (
    currentUserId,
    otherUserId
) => {
    if (!otherUserId) {
        throw new AppError("Participant required", 400);
    }

    if (currentUserId === otherUserId) {
        throw new AppError("Cannot chat with yourself", 400);
    }

    const otherUser = await User.findById(otherUserId);
    if (!otherUser || !otherUser.isVerified) {
        throw new AppError("User not available", 404);
    }

    const participants = [currentUserId, otherUserId].sort();

    let conversation = await Conversation.findOne({ participants });

    if (!conversation) {
        conversation = await Conversation.create({
            participants
        });
    }

    return conversation;
};

export const getMyConversationsService = async (userId) => {
    return await Conversation.find({
        participants: userId
    })
        .populate("participants", "name phone")
        .sort({ updateAt: -1 });
};

