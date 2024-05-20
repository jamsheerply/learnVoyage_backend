import { IDependencies } from "../../domain/interfaces";
import { signupController } from "./signupController";

export const controller = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
  };
};
