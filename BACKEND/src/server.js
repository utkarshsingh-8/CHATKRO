import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from './config/env.js';

const PORT = env.port || 4000;

(async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running properly on PORT= ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed", error);
        process.exit(1);
    }
})();
