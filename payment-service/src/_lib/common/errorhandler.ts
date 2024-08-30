import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.status || 400;
  return res.status(statusCode).json({
    success: false,
    status: error.statusCode,
    message: error.message || "Something went wrong",
  });
};

export default errorHandler;
