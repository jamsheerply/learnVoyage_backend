import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "../_boot/database";
import { startConsumer } from "../infrastructure/messageBroker/consumerRpc";
import { dependencies } from "../_boot/dependencies";
import { chatRoutes } from "../infrastructure/routes/chatRoutes";
import errorHandler from "../_lib/common/errorhandler";
import { jwtMiddleware } from "../_lib/jwt/verifyToken";
import { messageRoutes } from "../infrastructure/routes/messageRoutes";
import { Server } from "socket.io";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://learn-voyage-frontend.vercel.app",
      "https://learn-voyage.jamsheerply.life",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", jwtMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    message: `chat service ON! port:${PORT}`,
  });
});

const PORT = process.env.PORT!;
app.use("/", chatRoutes(dependencies));
app.use("/", messageRoutes(dependencies));

app.use(errorHandler);

app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});

const server = app.listen(PORT, async () => {
  console.log(`connected to chat service : Port ${PORT}`);
  await database();
  startConsumer("chat-service");
});

const io = new Server(server, {
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
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessageReceived.sender._id) return;
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
