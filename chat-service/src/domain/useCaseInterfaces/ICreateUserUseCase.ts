import { IUseCase } from "../../application/interfaces/IUseCase";
import { IUser } from "../entities/IUser";
import { userEntity } from "../entities/userEntity";

export interface ICreateUserUseCase {
  execute(data: IUser): Promise<userEntity | null>;
}
