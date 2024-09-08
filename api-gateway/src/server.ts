import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Constants
const PORT: number = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGINS: string[] = [process.env.FRONTEND_URL as string];

// Initialize Express app
const app: Application = express();
const isProduction = process.env.NODE_ENV === "production";

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Proxy routes configuration
const proxyRoutes = [
  { pathRegex: /^\/api\/users/, target: "http://localhost:3001" },
  { pathRegex: /^\/api\/chat-service/, target: "http://localhost:3002" },
  { pathRegex: /^\/api\/content-management/, target: "http://localhost:3003" },
  {
    pathRegex: /^\/api\/notification-service/,
    target: "http://localhost:3004",
  },
  { pathRegex: /^\/api\/payment-service/, target: "http://localhost:3005" },
];

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `API Gateway is healthy! Running on port: ${PORT}`,
    environment: isProduction ? "production" : "development",
  });
});

// Proxy middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const route = proxyRoutes.find((route) => route.pathRegex.test(req.path));
  if (route) {
    return proxy(route.target)(req, res, next);
  }
  next();
});

// Default route
app.use((req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(
    `🌱🌱🌱 API Gateway is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );
});
