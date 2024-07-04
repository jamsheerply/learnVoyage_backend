import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
  try {
    // Clear access token cookie
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
    });

    // Clear refresh token cookie
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
