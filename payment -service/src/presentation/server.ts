import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `Payment service ON! Port : ${PORT}`,
  });
});

app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});

const PORT = process.env.PORT!;

app.listen(PORT, () => {
  console.log(`connected to payement service : Port ${PORT}`);
});
