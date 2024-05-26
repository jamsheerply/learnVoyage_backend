import { IUser } from "../../entities/user.entity";

export interface ISignupUseCase {
  signup(userData: IUser): Promise<IUser | null>;
}
