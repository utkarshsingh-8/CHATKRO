import express from 'express';
import { errorHandler } from './utils/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Chat backend is healthy 🚀"
    });
});

app.use(errorHandler);

export default app;
