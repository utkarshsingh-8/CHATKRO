import {
    createConversationService,
    getMyConversationsService
} from "../services/conversation.service.js";

export const createConversation = async (req, res, next) => {
    try {
        const conversation = await createConversationService(
            req.user.userId,
            req.body.userId
        );

        res.status(201).json({
            success: true,
            data: conversation
        });
    } catch (e) {
        next(e);
    }
};

export const getMyConversations = async (req, res, next) => {
    try {
        const conversations = await getMyConversationsService(req.user.userId);

        res.status(200).json({
            success: true,
            data: conversations
        });
    } catch (e) {
        next(e);
    }
}