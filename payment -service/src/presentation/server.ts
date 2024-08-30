import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "../_lib/common/errorhandler";
import { dependencies } from "../_boot/dependencies";
import database from "../_boot/database";
import { paymentRoutes } from "../infrastructure/routes/paymentRoutes";
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://learn-voyage-frontend.vercel.app",
      "https://learn-voyage.jamsheerply.life",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `Payment service ON! Port : ${PORT}`,
  });
});

app.use("/", paymentRoutes(dependencies));

app.use(errorHandler);

app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});

const PORT = process.env.PORT!;

app.listen(PORT, async () => {
  console.log(`connected to payment service : Port ${PORT}`);
  await database();
});
