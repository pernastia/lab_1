import { type Request, type Response, type NextFunction } from "express";
import * as service from "../services/tickets.service.js";
import { ApiError } from "../errors.js";

export const getAllTickets = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let tickets = service.getAllTickets();
    // фільтрація
    const { author, priority } = req.query;

    if (author) {
      tickets = tickets.filter((t) =>
        t.author.toLowerCase().includes(String(author).toLowerCase()),
      );
    }

    if (priority) {
      tickets = tickets.filter((t) => t.priority === priority);
    }

    // сортування
    const sortDir = req.query.sortDir === "desc" ? -1 : 1;

    tickets.sort((a, b) => {
      return a.subject.localeCompare(b.subject) * sortDir;
    });

    // пагінація
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const pagedTickets = tickets.slice(start, end);

    res.json({
      items: pagedTickets,
    });
  } catch (error) {
    next(error);
  }
};

export const getTicketById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const ticket = service.getTicket(id);

    if (!ticket) {
      return next(new ApiError(404, "TICKET_NOT_FOUND", `Not found`));
    }

    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const createTicket = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _subject, _author } = req.body;

    const ticket = service.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const updateTicket = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ticket = service.updateTicket(Number(req.params.id), req.body);
    if (!ticket) {
      throw new ApiError(404, "TICKET_NOT_FOUND", `Not found`);
    }
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const success = service.removeTicket(Number(req.params.id));
    if (!success) {
      throw new ApiError(404, "TICKET_NOT_FOUND", "Ticket not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
