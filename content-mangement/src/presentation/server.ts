import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnections from "../infrastructure/database/dbConnections";
import categoryRoutes from "./routes/categoriesRoute";
import courseRoutes from "./routes/couresRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import { startConsumer } from "../infrastructure/messageBroker/consumerRpc";
import { jwtMiddleware } from "../infrastructure/jwt/verifyToken";
import videoRoutes from "./controllers/streaming/videoStreaming";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", jwtMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    message: `content Management service ON! port:${PORT}`,
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/category", categoryRoutes);
app.use("/course", courseRoutes);
app.use("/enrollment", enrollmentRoutes);
app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 3004;

app.listen(PORT, async () => {
  console.log(`content-management is runing on port ${PORT}`);
  await dbConnections();
  startConsumer("content-management-service");
});
