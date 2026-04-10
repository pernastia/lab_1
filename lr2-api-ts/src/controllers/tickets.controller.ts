import { type Request, type Response, type NextFunction } from "express";
import * as service from "../services/tickets.service.js";
import { ApiError } from "../errors.js";

export const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await service.getAllTickets(req.query);

    res.json({
      data,
      meta: { total: data.length },
    });
  } catch (error) {
    next(error);
  }
};

export const getTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const ticket = await service.getTicket(id);

    if (!ticket) {
      return next(new ApiError(404, "TICKET_NOT_FOUND", "Not found"));
    }

    res.status(200).json({ data: ticket });
  } catch (error) {
    next(error);
  }
};

export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ticket = await service.createTicket(req.body);

    res.status(201).json({ data: ticket });
  } catch (error: any) {
    if (error.message?.includes("UNIQUE")) {
      return next(new ApiError(409, "CONFLICT", "Duplicate ticket"));
    }

    next(error);
  }
};

export const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ticket = await service.updateTicket(Number(req.params.id), req.body);

    if (!ticket) {
      throw new ApiError(404, "TICKET_NOT_FOUND", "Not found");
    }

    res.json({ data: ticket });
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const success = await service.removeTicket(Number(req.params.id));

    if (!success) {
      throw new ApiError(404, "TICKET_NOT_FOUND", "Not found");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
