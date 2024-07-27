// import jwt from "jsonwebtoken";
// import { IUser } from "../../../domain/entities/user.entity";
// import { ITokenRepository } from "../../../domain/interfaces/repositories/ITokenRepositroy";

// // Function to generate refresh tokens, accepts refresh token private key as an argument
// const generateRefreshTokenService = (REFRESH_TOKEN_PRIVATE_KEY: string) => {
//   return {
//     // Method to generate a refresh token
//     generateToken: async (user: IUser) => {
//       const payload = {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       };

//       const generatedRefreshToken = jwt.sign(
//         payload,
//         REFRESH_TOKEN_PRIVATE_KEY,
//         {
//           expiresIn: "30d",
//         }
//       );
//       return generatedRefreshToken;
//     },
//   };
// };

// export { generateRefreshTokenService };

import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  firstName: string;
}

export const generateRefreshToken = (payload: UserPayload) => {
  const { id, email, role, isVerified, firstName } = payload;
  const newPayload = { id, email, role, isVerified, firstName };

  return jwt.sign(newPayload, String(process.env.REFRESH_TOKEN_PRIVATE_KEY), {
    expiresIn: "30d",
  });
};
