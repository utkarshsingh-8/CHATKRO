import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';
import userRoutes from "./routes/user.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { env } from './config/env.js';

const app = express();

// app.use(cors({
//     origin: env.client_url,
//     methods: ["GET","POST","PUT","DELETE"],
//     credentials: true
// }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Chat backend is healthy 🚀"
    });
});

app.use(errorHandler);

export default app;
