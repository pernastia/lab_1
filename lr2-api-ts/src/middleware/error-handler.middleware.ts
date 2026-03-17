import { type Request, type Response, type NextFunction } from "express";
import { ApiError } from "../errors.js";

export default function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details || [],
      },
    });
  }

  if (err && typeof err === "object" && "status" in err) {
    const apiErr = err as any;
    return res.status(apiErr.status).json({
      error: {
        code: apiErr.code || "ERROR",
        message: apiErr.message || "Unknown error",
        details: apiErr.details || null,
      },
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error",
    },
  });
}
