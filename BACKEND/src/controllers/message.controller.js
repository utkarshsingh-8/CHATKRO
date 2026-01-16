import {
    sendMessageService,
    getMessagesService
} from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { conversationId, content } = req.body;

        const message = await sendMessageService(
            req.user.userId,
            conversationId,
            content
        );

        res.status(201).json({
            success: true,
            data: message
        });
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const { conversationId, limit, before } = req.query;

        const messages = await getMessagesService(
            req.user.userId,
            conversationId,
            limit,
            before
        );

        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        next(error);
    }
};
