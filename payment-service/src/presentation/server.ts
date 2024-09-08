import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "../_lib/common/errorhandler";
import { dependencies } from "../_boot/dependencies";
import database from "../_boot/database";
import { paymentRoutes } from "../infrastructure/routes/paymentRoutes";
import { startConsumer } from "../infrastructure/messageBroker/consumerRpc";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3005;
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
app.get("/api/payment-service", (req: Request, res: Response) => {
  res.status(200).json({
    message: `Payment service is healthy! Running on port: ${PORT}`,
    environment: isProduction ? "production" : "development",
  });
});

// Apply routes
app.use("/api/payment-service", paymentRoutes(dependencies));

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API not found in payment service",
  });
});

app.listen(PORT, async () => {
  console.log(
    `🌱🌱🌱 payment server is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );
  await database();
  startConsumer("payment-service");
});
