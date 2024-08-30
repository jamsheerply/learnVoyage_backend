// src/server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import intructorRoutes from "./routes/instructorRoutes";
import dbConnections from "../infrastructure/database/dbConnections";

dotenv.config();

const app = express();
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

app.get("/api/users", (req: Request, res: Response) => {
  res.status(200).json({
    message: `auth service ON! port:${PORT}`,
  });
});

app.use("/api/users/auth", userRoutes);
app.use("/api/users/instructor", intructorRoutes);

const PORT = process.env.PORT!;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await dbConnections();
});
