import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import instructorRoutes from "./routes/instructorRoutes";
import dbConnections from "../infrastructure/database/dbConnections";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);
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
app.get("/", (req: Request, res: Response) => {
  // setTimeout(() => {
  res.status(200).json({
    message: `Auth service is healthy! Running on port: ${PORT}`,
    health: true,
    environment: isProduction ? "production" : "development",
  });
  // }, 36000);
});

// Production routes (for use with Ingress)
app.use("/api/users/auth", userRoutes);
app.use("/api/users/instructor", instructorRoutes);

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API not found in auth service",
  });
});

const server = app.listen(PORT, async () => {
  console.log(
    `🌱🌱🌱 Auth server is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );

  await dbConnections();
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
