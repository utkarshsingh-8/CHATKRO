import { Router } from 'express';
import { createUser, getMe, updateProfile } from '../controllers/user.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createUser);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);

export default router;