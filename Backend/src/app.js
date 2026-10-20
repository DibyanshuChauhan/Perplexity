import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../public");

const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
    cors({
        origin(origin, callback) {
            // Allow requests without an Origin header (same-origin, Postman, mobile apps)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin) || origin.includes(".onrender.com")) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// 1. Serve static frontend assets built into Backend/public
app.use(express.static(publicPath));

// 2. Mount API Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// 3. Unhandled API endpoints return 404 JSON
app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// 4. SPA Fallback: Serve index.html for all non-API GET requests (Express 5 syntax)
app.get("{*splat}", (req, res) => {
    const indexPath = path.join(publicPath, "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(200).send("🚀 Perplexity AI backend is running. Please build the frontend into Backend/public.");
        }
    });
});

export default app;