import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

const app: Application = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

//npm run build
//npm start
