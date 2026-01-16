import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { AppError } from "../utils/appError.js";

export const sendMessageService = async (
    senderId,
    conversationId,
    content
) => {
    if (!content) {
        throw new AppError(" Message content required", 400);
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    if (!conversation.participants.includes(senderId)) {
        throw new AppError("Not authorized to send message", 403);
    }

    const message = await Message.create({
        conversationId,
        senderId,
        content
    });

    conversation.lastMessage = message._id;
    await conversation.save();

    return message;
};

export const getMessagesService = async (
    userId,
    conversationId,
    limit = 20,
    before
) => {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    if (!conversation.participants.includes(userId)) {
        throw new AppError("Not authorized to view messages", 403);
    }

    const query = { conversationId };

    if (before) {
        query.createdAt = { $lt: new Date(before) };
    }

    return await Message.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit));
};