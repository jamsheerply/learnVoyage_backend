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
import videoRoutes from "./controllers/streaming/videoStreaming";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3004;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Health check route
app.get("/api/content-management", (req: Request, res: Response) => {
  res.status(200).json({
    message: `Content Management is healthy! Running on port: ${PORT}`,
    environment: isProduction ? "production" : "development",
  });
});

// Apply routes
app.use("/api/content-management/category", categoryRoutes);
app.use("/api/content-management/course", courseRoutes);
app.use("/api/content-management/enrollment", enrollmentRoutes);
app.use("/api/content-management/assessment", assessmentRoutes);
app.use("/api/content-management/result", resultRoutes);
app.use("/api/content-management/rate-and-review", rateAndReviewRoutes);
app.use("/api/content-management/videos", videoRoutes);

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API Not found in content management service",
  });
});

const server = app.listen(PORT, async () => {
  console.log(
    `🌱🌱🌱 Content Management is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );

  await dbConnections();
  startConsumer("content-management-service");
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
