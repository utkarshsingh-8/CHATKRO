import { Router } from "express";
import {
    createConversation,
    getMyConversations
} from "../controllers/conversation.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createConversation);
router.get("/", getMyConversations);

export default router;


