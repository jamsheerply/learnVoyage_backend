import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnections from "../infrastructure/database/dbConnections";
import category from "./routes/categoriesRoute";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/category", category);

const PORT = process.env.PORT || 3004;

app.listen(PORT, async () => {
  console.log(`content-management is runing on port ${PORT}`);
  await dbConnections();
});
