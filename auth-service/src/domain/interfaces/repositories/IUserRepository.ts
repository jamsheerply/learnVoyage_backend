import { IUser } from "../../entities/user.entity";

export interface IUserRepository {
  addUser(userData: IUser): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
}
