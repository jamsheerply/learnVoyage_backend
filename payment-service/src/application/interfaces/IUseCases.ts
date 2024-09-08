import {
  ICreateCourseUseCase,
  ICreatePaymentUseCase,
  ICreateSessionUseCase,
  ICreateUserUseCase,
  IDownloadTransationsUseCase,
  IGetSessionByIdUseCase,
  IReadPaymentTotalRevenueUseCase,
  IReadPaymentUseCase,
  IUpdatePaymentUseCase,
} from "../../domain/useCaseInterfaces";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
  createPaymentUseCase: (dependencies: IDependencies) => ICreatePaymentUseCase;
  updatePaymentUseCase: (dependencies: IDependencies) => IUpdatePaymentUseCase;
  createSessionUseCase: (dependencies: IDependencies) => ICreateSessionUseCase;
  getSessionByIdUseCase: (
    dependencies: IDependencies
  ) => IGetSessionByIdUseCase;
  readPaymentUseCase: (dependencies: IDependencies) => IReadPaymentUseCase;
  readPaymentTotalRevenueUseCase: (
    dependencies: IDependencies
  ) => IReadPaymentTotalRevenueUseCase;
  downloadTransationsUseCase: (
    dependencies: IDependencies
  ) => IDownloadTransationsUseCase;
  createUserUserCase: (dependencies: IDependencies) => ICreateUserUseCase;
  createCourseUseCase: (dependencies: IDependencies) => ICreateCourseUseCase;
}
