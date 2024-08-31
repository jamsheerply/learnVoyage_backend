import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnections from "../infrastructure/database/dbConnections";
import categoryRoutes from "./routes/categoriesRoute";
import courseRoutes from "./routes/couresRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import assessmentRoutes from "./routes/assessmentRoutes";
import resultRoutes from "./routes/resultRoutes";
import rateAndReviewRoutes from "./routes/rateAndReviewRoutes";
import { startConsumer } from "../infrastructure/messageBroker/consumerRpc";
import { jwtMiddleware } from "../infrastructure/jwt/verifyToken";
import videoRoutes from "./controllers/streaming/videoStreaming";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.get(
  "/api/content-management",
  jwtMiddleware,
  (req: Request, res: Response) => {
    res.status(200).json({
      message: `content Management service ON! port:${PORT}`,
    });
  }
);

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

app.use("/api/content-management/category", categoryRoutes);
app.use("/api/content-management/course", courseRoutes);
app.use("/api/content-management/enrollment", enrollmentRoutes);
app.use("/api/content-management/assessment", assessmentRoutes);
app.use("/api/content-management/result", resultRoutes);
app.use("/api/content-management/rate-and-review", rateAndReviewRoutes);
app.use("/api/content-management/videos", videoRoutes);

const PORT = process.env.PORT || 3004;
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Api Not found content management",
  });
});
app.listen(PORT, async () => {
  console.log(`content-management is runing on port ${PORT}`);
  await dbConnections();
  startConsumer("content-management-service");
});
