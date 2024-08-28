import * as Yup from "yup";

export interface CustomError extends Error {
  message: string;
  stack?: string;
  code?: number;
  status?: number;
  statusCode?: number;
}

// Define a type guard to check if the error is a Yup.ValidationError
export function isYupValidationError(
  error: unknown
): error is Yup.ValidationError {
  return error instanceof Yup.ValidationError;
}
