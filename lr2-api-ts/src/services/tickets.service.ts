import * as ticketRepo from "../repositories/tickets.repository.js";
import { type TicketResponseDTO } from "../dtos/tickets.dto.js";

export const getAllTickets = () => ticketRepo.getAll();

export const getTicket = (id: number) => {
    return ticketRepo.getById(id);
};

export const createTicket = (data: Omit<TicketResponseDTO, "id">) => {
    return ticketRepo.create(data);
};

export const updateTicket = (id: number, data: Omit<TicketResponseDTO, "id">) => {
    return ticketRepo.update(id, data);
};

export const removeTicket = (id: number) => {
    return ticketRepo.remove(id);
};