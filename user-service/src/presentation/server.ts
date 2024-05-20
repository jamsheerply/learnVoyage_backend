import express, { Application } from "express";
import { userRoutes } from "../infrastructure/routes/user.routes";

const port: Number = 3000;
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`service is runing at ${port}`);
});

export default app;
