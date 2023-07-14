import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../interfaces";

export default async function handleError(
  error: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Internal server error";

  return res.status(status).json({ message: message });
}
