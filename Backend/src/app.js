import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();
const allowedOrigins = ["http://localhost:5173"];

if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
    cors({
    origin(origin, callback) {
      // Allow requests without an Origin header (Postman, mobile apps)
        if (!origin) {
        return callback(null, true);
    }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
    }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({
    success: true,
    message: "🚀 AI Mail Backend is running successfully!",
});
});

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

app.use((req, res) => {
    res.status(404).json({
    success: false,
    message: "Route not found",
});
});

export default app;