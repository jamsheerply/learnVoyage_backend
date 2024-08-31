import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import notificationRoute from "../presentation/routes/notificationRoutes";
import { startConsumer } from "../infrastructure/messageBroker/consumerRpc";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    status: 200,
    message: " notification is on ",
  });
});
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
  console.log(`notification-server is running on port ${PORT}`);
  startConsumer("notification-service");
});
