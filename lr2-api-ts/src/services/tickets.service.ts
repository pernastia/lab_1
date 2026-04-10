import * as repo from "../repositories/tickets.repository.js";

export const getAllTickets = async (query: any) => {
  return await repo.getAllTickets(query);
};

export const getTicket = async (id: number) => {
  return await repo.getTicketById(id);
};

export const createTicket = async (data: any) => {
  return await repo.createTicket(data);
};

export const updateTicket = async (id: number, data: any) => {
  return await repo.updateTicket(id, data);
};

export const removeTicket = async (id: number) => {
  return await repo.deleteTicket(id);
};
