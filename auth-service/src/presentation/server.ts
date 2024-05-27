// src/server.ts
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import dbConnections from "../infrastructure/database/dbConnections";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await dbConnections();
  console.log(`Server is running on port ${PORT}`);
});
