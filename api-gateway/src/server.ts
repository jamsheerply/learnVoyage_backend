import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGINS: string[] = [process.env.FRONTEND_URL as string];

const app: Application = express();
const isProduction = process.env.NODE_ENV === "production";

app.use(cookieParser());
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const proxyRoutes = [
  { pathRegex: /^\/api\/users/, target: process.env.AUTH_URL },
  { pathRegex: /^\/api\/chat-service/, target: process.env.CHAT_SERVICE_URL },
  {
    pathRegex: /^\/api\/content-management/,
    target: process.env.CONTENT_MANAGEMENT_URL,
  },
  {
    pathRegex: /^\/api\/notification-service/,
    target: process.env.NOTIFICATIONS_SERVICE_URL,
  },
  {
    pathRegex: /^\/api\/payment-service/,
    target: process.env.PAYMENT_SERVICE_URL,
  },
];

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `API Gateway is healthy! Running on port: ${PORT}`,
    health: true,
    environment: isProduction ? "production" : "development",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const route = proxyRoutes.find((route) => route.pathRegex.test(req.path));
  if (route) {
    return proxy(route.target as string)(req, res, next);
  }
  next();
});

app.use((req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

// Start the server and store the instance in a variable
const server = app.listen(PORT, () => {
  console.log(
    `🌱🌱🌱 API Gateway is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );
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
