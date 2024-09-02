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
const PORT = process.env.PORT || 3004;
const isProduction = process.env.NODE_ENV === "production";

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

// Base path for routes
const basePath = isProduction ? "/api/content-management" : "";

// Health check route
app.get(`${basePath}/health`, jwtMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    message: `Content Management service ON! Port: ${PORT}`,
  });
});

// Apply routes
app.use(`${basePath}/category`, categoryRoutes);
app.use(`${basePath}/course`, courseRoutes);
app.use(`${basePath}/enrollment`, enrollmentRoutes);
app.use(`${basePath}/assessment`, assessmentRoutes);
app.use(`${basePath}/result`, resultRoutes);
app.use(`${basePath}/rate-and-review`, rateAndReviewRoutes);
app.use(`${basePath}/videos`, videoRoutes);

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API Not found in content management service",
  });
});

app.listen(PORT, async () => {
  console.log(`Content Management service is running on port ${PORT}`);
  await dbConnections();
  startConsumer("content-management-service");
});
