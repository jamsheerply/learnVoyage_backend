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
const verifyToken_1 = require("../_lib/jwt/verifyToken");
const messageRoutes_1 = require("../infrastructure/routes/messageRoutes");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://learn-voyage-frontend.vercel.app",
        "https://learn-voyage.jamsheerply.life",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.get("/", verifyToken_1.jwtMiddleware, (req, res) => {
    res.status(200).json({
        message: `chat service ON! port:${PORT}`,
    });
});
const PORT = process.env.PORT;
app.use("/", (0, chatRoutes_1.chatRoutes)(dependencies_1.dependencies));
app.use("/", (0, messageRoutes_1.messageRoutes)(dependencies_1.dependencies));
app.use(errorhandler_1.default);
app.use("*", (req, res) => {
    res
        .status(404)
        .json({ success: false, status: 404, message: "Api Not found" });
});
const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`connected to chat service : Port ${PORT}`);
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
    console.log("connected to socket.io");
    socket.on("setup", (userId) => {
        socket.join(userId);
        socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined room:" + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("new message", (newMessageReceived) => {
        console.log("new message");
        console.log(JSON.stringify(newMessageReceived));
        var chat = newMessageReceived.chat;
        if (!chat.users)
            return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id)
                return;
            console.log("message recived");
            console.log(JSON.stringify(newMessageReceived));
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
    // socket.off("setup", () => {
    //   console.log("user disconnected");
    //   socket.leave(userId);
    // });
});
