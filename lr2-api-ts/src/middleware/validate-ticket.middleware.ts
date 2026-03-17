import { type Request, type Response, type NextFunction } from "express";
import { ApiError } from "../errors.js";

export default function validateTicket(req: Request, res: Response, next: NextFunction) {
    const { subject, author } = req.body;

    const errors = [];

    if (!subject || typeof subject !== "string" || subject.length < 3) {
        errors.push({ field: "subject", message: "Subject must be at least 3 chars" });
    }

    if (!author || typeof author !== "string") {
        errors.push({ field: "author", message: "Author is required" });
    }

    if (errors.length > 0) {
        return next(new ApiError(400, "VALIDATION_ERROR", "Invalid request body", errors));
    }

    next();
}