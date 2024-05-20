import { ISingnupUseCase } from "../useCaseinterface";
import { IDependencies } from "./dependencies";

export interface IUseCase {
  signupUseCase: (dependecies: IDependencies) => ISingnupUseCase;
}
