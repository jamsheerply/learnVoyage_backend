import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import notificationRoute from "../presentation/routes/notificationRoutes";
import {
  connectToRabbitMQ,
  createQueue,
} from "../infrastructure/messaging/RMQConnections";
import { consumeMessages } from "../infrastructure/messaging/consumer";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", notificationRoute);

const PORT = process.env.PORT || 3003;

app.listen(PORT, async () => {
  console.log(`notification-server is running on port ${PORT}`);
  await connectToRabbitMQ();
  // await createQueue("notification-service-2");
  // consumeMessages("notification-service-2");
});
