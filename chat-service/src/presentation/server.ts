import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "../_boot/database";
import { startConsumer } from "../infrastructure/messageBroker/consumerRpc";
import { dependencies } from "../_boot/dependencies";
import { chatRoutes } from "../infrastructure/routes/chatRoutes";
import errorHandler from "../_lib/common/errorhandler";
import { messageRoutes } from "../infrastructure/routes/messageRoutes";
import { Server } from "socket.io";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4001;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL_1 as string,
      process.env.FRONTEND_URL_2 as string,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `Chat service is healthy! Running on port: ${PORT}`,
    health: true,
    environment: isProduction ? "production" : "development",
  });
});

// Apply routes
app.use("/api/chat-service", chatRoutes(dependencies));
app.use("/api/chat-service", messageRoutes(dependencies));

app.use(errorHandler);

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API Not found in chat-service",
  });
});

const server = app.listen(PORT, async () => {
  console.log(
    `🌱🌱🌱 chat service is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );

  await database();
  startConsumer("chat-service");
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      process.env.FRONTEND_URL_1 as string,
      process.env.FRONTEND_URL_2 as string,
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
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessageReceived.sender._id) return;
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
