import { signinUseCase } from "../../application/signinUseCase";
import { signupUseCase } from "../../application/signupUseCase";
import { signupRepository } from "../database/repositories/signupRepository";
import BcryptHashingService from "../security/bcrypt";
import { channel } from "./rMqConnectins";

const handleConsumer = async (
  msgType: string,
  message: any,
  properties: any
) => {
  try {
    const parsedMessage = JSON.parse(message);
    switch (msgType) {
      case "addUser":
        const {
          firstName,
          lastName,
          email: signupEmail,
          password: signupPassword,
        } = parsedMessage;
        try {
          const newUser = await signupUseCase(
            signupRepository,
            BcryptHashingService
          )({
            firstName,
            lastName,
            email: signupEmail,
            password: signupPassword,
          });

          // Reply with success
          channel?.sendToQueue(
            properties.replyTo,
            Buffer.from(JSON.stringify(newUser)),
            {
              correlationId: properties.correlationId,
            }
          );
        } catch (error) {
          console.error("Error in addUser case:", error);
          // Reply with failure
          channel?.sendToQueue(
            properties.replyTo,
            Buffer.from(JSON.stringify({ error: "Failed to add user" })),
            {
              correlationId: properties.correlationId,
            }
          );
        }
        break;

      case "loginUser":
        const { email: loginEmail, password: loginPassword } = parsedMessage;
        try {
          const loginUser = await signinUseCase(
            signupRepository,
            BcryptHashingService
          )(loginEmail, loginPassword);
          // Reply with success
          channel?.sendToQueue(
            properties.replyTo,
            Buffer.from(JSON.stringify(loginUser)),
            {
              correlationId: properties.correlationId,
            }
          );
        } catch (error) {
          console.error("Error in loginUser case:", error);
          // Reply with failure
          channel?.sendToQueue(
            properties.replyTo,
            Buffer.from(JSON.stringify({ error: "Failed to login user" })),
            {
              correlationId: properties.correlationId,
            }
          );
        }
        break;

      default:
        console.error(`Unhandled message type: ${msgType}`);
        break;
    }
  } catch (error) {
    console.error(`Failed to process message of type ${msgType}:`, error);
  }
};

export { handleConsumer };
