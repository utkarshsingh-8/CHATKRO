import app from "./app.js";
import { env } from './config/env.js';

(async () => {
    try {
        // await connectDB();

        app.listen(env.port, () => {
            console.log(`🚀 Server is running properly on PORT= ${env.port}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed", error);
        process.exit(1);
    }
}) ();

