import { IUser } from "../../entities/user.entity";

export interface IUserRepository {
  create(userData: IUser): Promise<IUser | null>;
}
