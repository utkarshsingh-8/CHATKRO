import { Router } from "express";
import {
    sendMessage,
    getMessages
} from "../controllers/message.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.post("/", sendMessage);
router.get("/", getMessages);

export default router;
