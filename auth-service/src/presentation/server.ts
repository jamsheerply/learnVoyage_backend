import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`server is runing on port ${PORT}`);
});
