import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import dbConnections from "../infrastructure/database/dbConnections";
import {
  connectToRabbitMQ,
  createQueue,
} from "../infrastructure/messaging/rMqConnectins";
import { consumeMessages } from "../infrastructure/messaging/consumer";

const app: Application = express();

app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await dbConnections();
  await connectToRabbitMQ();
  consumeMessages("user-service");
  console.log(`server is running on port ${PORT}`);
});
