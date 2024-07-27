// import { Request, Response, NextFunction } from "express";
// import { verifyAccessToken } from "../../infrastructure/security/jwt/verifyAccessTokenService";
// import { verifyRefreshToken } from "../../infrastructure/security/jwt/verifyRefreshTokenService";
// import { generateAccessTokenService } from "../../infrastructure/security/jwt/generateAccessToken";
// import jwtDecode, { JwtPayload } from "jwt-decode"; // Correctly import jwtDecode

// interface User extends JwtPayload {
//   id: string;
//   email: string;
//   role: string;
//   isVerified: boolean;
//   firstName: string;
// }

// const authMiddleware = (
//   ACCESS_TOKEN_PRIVATE_KEY: string,
//   REFRESH_TOKEN_PRIVATE_KEY: string
// ) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const accessToken = req.cookies.accessToken;

//     if (!accessToken) {
//       const refreshToken = req.cookies.refreshToken;
//       if (!refreshToken) {
//         return res
//           .status(401)
//           .json({ success: false, message: "No refresh token" });
//       } else {
//         try {
//           const verifiedRefreshToken = await verifyRefreshToken(
//             REFRESH_TOKEN_PRIVATE_KEY
//           )(refreshToken);

//           if (
//             !verifiedRefreshToken ||
//             typeof verifiedRefreshToken === "string"
//           ) {
//             throw new Error("Invalid user credential");
//           }

//           const accessTokenService = generateAccessTokenService(
//             ACCESS_TOKEN_PRIVATE_KEY
//           );

//           const user = verifiedRefreshToken as User;
//           const newAccessToken = accessTokenService.generateToken(user);

//           res.cookie("accessToken", newAccessToken, {
//             httpOnly: true,
//             maxAge: 14 * 60 * 1000,
//           });

//           next();
//         } catch (error) {
//           return res.status(401).json({
//             success: false,
//             message: "Refresh token verification failed",
//           });
//         }
//       }
//     } else {
//       try {
//         const verifiedAccessToken = verifyAccessToken(ACCESS_TOKEN_PRIVATE_KEY)(
//           accessToken
//         );

//         req.user = verifiedAccessToken as any; // Attach user info to request object

//         next();
//       } catch (error) {
//         return res.status(401).json({
//           success: false,
//           message: "Access token verification failed",
//         });
//       }
//     }
//   };
// };

// export default authMiddleware;
