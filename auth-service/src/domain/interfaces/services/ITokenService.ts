import { IUser } from "../../entities/user.entity";

export interface ITokenService {
  generateToken(user: IUser): string;
}
