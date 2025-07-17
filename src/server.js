import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import friendRoutes from "./routes/friendRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS config — abhi sirf localhost ke liye, production URL baad me
const allowedOrigins = [
  "http://localhost:5173",
  "https://vibely-chat-app-uty3.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Preflight OPTIONS request ke liye
app.options("*", cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/friends", friendRoutes);

// ✅ Server start — ye line YAHAN likhni hai
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  connectDB();
});
