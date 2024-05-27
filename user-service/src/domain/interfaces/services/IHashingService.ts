export interface IHashingService {
  hash(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>; // Add this method
}
