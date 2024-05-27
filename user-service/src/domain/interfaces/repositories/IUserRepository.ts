import { IUser } from "../../entities/user.entity";

export interface IUserRepository {
  create(userData: IUser): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>; // Add this method
}
