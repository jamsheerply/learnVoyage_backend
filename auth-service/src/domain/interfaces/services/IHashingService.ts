// export interface IHashingService {
//   hash(password: string): Promise<string>;
//   compare(password: string, hashedPassword: string): Promise<boolean>;
// }

// src/domain/interfaces/services/IHashingService.ts
export interface IHashingService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
