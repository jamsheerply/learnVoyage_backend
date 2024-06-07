// export interface IUser {
//   _id?: any;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   password: string;
//   role?: string;
// }

// src/domain/entities/user.entity.ts
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";
  profile: {
    avatar: string;
    dob: string;
    gender: "male" | "female" | "other";
  };
  contact: {
    additionalEmail: string;
    phone: string;
    socialMedia: {
      instagram: string;
      linkedIn: string;
      github: string;
    };
  };
  isBlocked: boolean;
  isVerified: boolean;
  profession: string;
  otp: string;
  profit: number;
}

export const createUser = (userData: IUser): IUser => ({
  ...userData,
});