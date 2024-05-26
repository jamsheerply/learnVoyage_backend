import { Request, Response } from "express";
import { sendMessageToQueue } from "../../infrastructure/messaging/producer";
import {
  connectToRabbitMQ,
  createQueue,
} from "../../infrastructure/messaging/rMqConnectins";
export const signupController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    await connectToRabbitMQ();
    await createQueue("user-service");
    await sendMessageToQueue(
      "user-service",
      "addUser",
      JSON.stringify(req.body)
    );

    return res.status(201).json({ success: true, data: req.body });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to sign up user" });
  }
};
