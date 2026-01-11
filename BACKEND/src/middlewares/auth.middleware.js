import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token Missing" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(token, env.jwt_secret);

        req.user = decoded;

        next();
    } catch (e) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}