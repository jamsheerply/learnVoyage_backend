"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = __importDefault(require("../_boot/database"));
const consumerRpc_1 = require("../infrastructure/messageBroker/consumerRpc");
const dependencies_1 = require("../_boot/dependencies");
const chatRoutes_1 = require("../infrastructure/routes/chatRoutes");
const errorhandler_1 = __importDefault(require("../_lib/common/errorhandler"));
const messageRoutes_1 = require("../infrastructure/routes/messageRoutes");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4001;
const isProduction = process.env.NODE_ENV === "production";
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    optionsSuccessStatus: 200,
}));
// Health check route
app.get("/api/chat-service", (req, res) => {
    res.status(200).json({
        message: `Chat service is healthy! Running on port: ${PORT}`,
        environment: isProduction ? "production" : "development",
    });
});
// Apply routes
app.use("/api/chat-service", (0, chatRoutes_1.chatRoutes)(dependencies_1.dependencies));
app.use("/api/chat-service", (0, messageRoutes_1.messageRoutes)(dependencies_1.dependencies));
app.use(errorhandler_1.default);
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: "API Not found in chat-service",
    });
});
const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🌱🌱🌱 chat service is running on port ${PORT} in ${isProduction ? "🌟 production" : "🚧 development"} mode 🌱🌱🌱`);
    yield (0, database_1.default)();
    (0, consumerRpc_1.startConsumer)("chat-service");
}));
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: [
            "http://localhost:5173",
            "https://learn-voyage-frontend.vercel.app",
            "https://learn-voyage.jamsheerply.life",
        ],
    },
});
io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userId) => {
        socket.join(userId);
        socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room:" + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("new message", (newMessageReceived) => {
        console.log("New message:", JSON.stringify(newMessageReceived));
        const chat = newMessageReceived.chat;
        if (!chat.users)
            return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id)
                return;
            console.log("Message received:", JSON.stringify(newMessageReceived));
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
    // Uncomment if you want to handle disconnections
    // socket.on("disconnect", () => {
    //   console.log("User disconnected");
    //   // Additional cleanup if needed
    // });
});
// Handle SIGTERM for graceful shutdown
process.on("SIGTERM", () => {
    console.log("Received SIGTERM, shutting down gracefully...");
    server.close(() => {
        console.log("Closed remaining connections");
        process.exit(0);
    });
});
// Optional: Handle other termination signals like SIGINT (Ctrl+C)
process.on("SIGINT", () => {
    console.log("Received SIGINT, shutting down gracefully...");
    server.close(() => {
        console.log("Closed remaining connections");
        process.exit(0);
    });
});
