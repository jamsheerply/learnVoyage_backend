import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/users", proxy("http://localhost:3001"));
app.use("/api/content-management", proxy("http://localhost:3004"));
app.use("/api/payment-service", proxy("http://localhost:3005"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//npm run build
//npm start
