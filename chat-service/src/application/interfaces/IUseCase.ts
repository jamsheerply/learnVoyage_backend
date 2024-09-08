import { IAccessChatUseCase } from "../../domain/useCaseInterfaces/IAccessChatUseCase";
import { IAddToGroupChatUseCase } from "../../domain/useCaseInterfaces/IAddToGroupChatUseCase";
import { IAllMessageByIdUseCase } from "../../domain/useCaseInterfaces/IAllMessageByIdUseCase";
import { IcreatGroupChatUseCase } from "../../domain/useCaseInterfaces/ICreateGroupChatUseCase";
import { ICreateMessageUseCase } from "../../domain/useCaseInterfaces/ICreateMessageUseCase";
import { ICreateUserUseCase } from "../../domain/useCaseInterfaces/ICreateUserUseCase";
import { IFetchChatUseCase } from "../../domain/useCaseInterfaces/IFetchChatsUseCase";
import { IReadGroupChatByNameUseCase } from "../../domain/useCaseInterfaces/IReadGroupChatByNameUseCase";
import { IRemoveFromGroupChatUseCase } from "../../domain/useCaseInterfaces/IRemoveFromGroupChatUseCase";
import { ISearchUserUseCase } from "../../domain/useCaseInterfaces/ISearchUserUseCase";
import { IUpdateChatById } from "../../domain/useCaseInterfaces/IUpdateChatByIdUseCase";
import { IDependencies } from "./IDependencies";

export interface IUseCase {
  createUserUseCase: (dependecies: IDependencies) => ICreateUserUseCase;
  accessChatUseCase: (dependecies: IDependencies) => IAccessChatUseCase;
  fetchChatsUseCase: (dependecies: IDependencies) => IFetchChatUseCase;
  createGroupChatUseCase: (
    dependecies: IDependencies
  ) => IcreatGroupChatUseCase;
  updateChatByIdUseCase: (dependencies: IDependencies) => IUpdateChatById;
  addToGroupChatUseCase: (
    dependencies: IDependencies
  ) => IAddToGroupChatUseCase;
  removeFromGroupChatUseCase: (
    dependencies: IDependencies
  ) => IRemoveFromGroupChatUseCase;
  searchUserUseCase: (dependencies: IDependencies) => ISearchUserUseCase;
  createMessageUseCase: (dependencies: IDependencies) => ICreateMessageUseCase;
  allMessageByIdUseCase: (
    dependencies: IDependencies
  ) => IAllMessageByIdUseCase;
  readGroupChatByNameUseCase: (
    dependencies: IDependencies
  ) => IReadGroupChatByNameUseCase;
}
