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
