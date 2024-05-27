import { IUser } from "../../entities/user.entity";

export interface IUserUseCase {
  signup(userData: IUser): Promise<IUser | null>;
  signin(userData: IUser): Promise<IUser | null>;
}
