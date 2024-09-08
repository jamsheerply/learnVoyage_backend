import { userEntity } from "../entities/userEntity";

export interface ICreateUserUseCase {
  execute(data: userEntity): Promise<userEntity | null>;
}
