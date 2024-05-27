// import {
//   handleUserAdded,
//   handleUserAddFailed,
// } from "../../presentation/controller/signupController";

const handleConsumer = async (msgType: string, message: any) => {
  try {
    const parsedMessage = JSON.parse(message);
    switch (msgType) {
      case "userAdded":
        // await handleUserAdded(parsedMessage);
        break;
      case "userAddFailed":
        // await handleUserAddFailed(parsedMessage);
        break;
      default:
        console.error(`Unhandled message type: ${msgType}`);
    }
  } catch (error) {
    console.error(`Failed to handle message of type ${msgType}:`, error);
  }
};

export { handleConsumer };
