// import jwt from "jsonwebtoken";

// // Define the User interface
// export interface User {
//   id: string;
//   email: string;
//   role: string;
//   isVerified: boolean;
//   firstName: string;
// }

// // Function to generate access tokens, accepts access token private key as an argument
// const generateAccessTokenService = (ACCESS_TOKEN_PRIVATE_KEY: string) => {
//   return {
//     // Method to generate an access token
//     generateToken: (user: User) => {
//       const payload = {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//         firstName: user.firstName,
//       };
//       return jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
//         expiresIn: "30d",
//       });
//     },
//   };
// };

// export { generateAccessTokenService };

import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  firstName: string;
}

export const generateAccessToken = (payload: UserPayload) => {
  console.log("token generatted");
  const { id, email, role, isVerified, firstName } = payload;
  const newPayload = { id, email, role, isVerified, firstName };

  return jwt.sign(newPayload, String(process.env.ACCESS_TOKEN_PRIVATE_KEY), {
    expiresIn: "1s",
  });
};
