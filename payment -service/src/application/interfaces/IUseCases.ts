import {
  ICreatePaymentUseCase,
  ICreateSessionUseCase,
  IGetSessionByIdUseCase,
  IReadPaymentUseCase,
  IUpdatePaymentUseCase,
} from "../../domain/useCaseInterfaces";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  createPaymentUseCase: (dependecies: IDependencies) => ICreatePaymentUseCase;
  updatePaymentUseCase: (dependecies: IDependencies) => IUpdatePaymentUseCase;
  createSessionUseCase: (dependecies: IDependencies) => ICreateSessionUseCase;
  getSessionByIdUseCase: (dependecies: IDependencies) => IGetSessionByIdUseCase;
  readPaymentUseCase: (dependecies: IDependencies) => IReadPaymentUseCase;
}
