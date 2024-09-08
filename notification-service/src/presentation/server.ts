import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import notificationRoute from "../presentation/routes/notificationRoutes";
import { startConsumer } from "../infrastructure/messageBroker/consumerRpc";

dotenv.config();

const app: Application = express();
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/notification-service", (req: Request, res: Response) => {
  res.status(200).json({
    message: `notification service is healthy! Running on port: ${PORT}`,
    environment: isProduction ? "production" : "development",
  });
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/notification", notificationRoute);

const PORT = process.env.PORT || 3003;
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Api Not found notification",
  });
});
app.listen(PORT, async () => {
  console.log(
    `🌱🌱🌱 notification-server is running on port ${PORT} in ${
      isProduction ? "🌟 production" : "🚧 development"
    } mode 🌱🌱🌱`
  );

  startConsumer("notification-service");
});
