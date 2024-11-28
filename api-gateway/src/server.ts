import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGINS: string[] = [
  process.env.FRONTEND_URL_1 as string,
  process.env.FRONTEND_URL_2 as string,
];

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

// API Gateway URL
const apiGatewayUrl = process.env.API_GATEWAY_URL!;

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

// Function to call APIs concurrently and log all outputs
const callAllApis = async () => {
  console.log("Calling APIs...");

  const apiCalls = proxyRoutes.map((route) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (route.target) {
          console.log(`Calling ${route.target}`);
          const response = await fetch(route.target);
          if (!response.ok) {
            console.error(
              `Failed to connect to ${route.target}. Status: ${response.status}`
            );
            reject(new Error(`Failed to connect to ${route.target}`));
          } else {
            console.log(`Successfully connected to ${route.target}`);
            resolve(`Successfully connected to ${route.target}`);
          }
        }
      } catch (error) {
        console.error(`Error during API call to ${route.target}:`, error);
        reject(error);
      }
    });
  });

  // Add the API Gateway URL call
  apiCalls.push(
    new Promise(async (resolve, reject) => {
      try {
        console.log(`Calling ${apiGatewayUrl}`);
        const gatewayResponse = await fetch(apiGatewayUrl);
        if (!gatewayResponse.ok) {
          console.error(
            `Failed to connect to ${apiGatewayUrl}. Status: ${gatewayResponse.status}`
          );
          reject(new Error(`Failed to connect to ${apiGatewayUrl}`));
        } else {
          console.log(`Successfully connected to ${apiGatewayUrl}`);
          resolve(`Successfully connected to ${apiGatewayUrl}`);
        }
      } catch (error) {
        console.error(`Error during API call to ${apiGatewayUrl}:`, error);
        reject(error);
      }
    })
  );

  // Run all promises concurrently and wait for all to settle
  await Promise.allSettled(apiCalls); // Ensures all results (success or failure) are logged
};

// Start the server and store the instance in a variable
app.listen(PORT, () => {
  console.log(
    `🌱🌱🌱 API Gateway is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );
});

// Call APIs every 14 seconds
const intervalId = setInterval(callAllApis, 14000);
