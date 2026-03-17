import { type TicketResponseDTO } from "../dtos/tickets.dto.js";

const tickets: TicketResponseDTO[] = [];
let nextId = 1;

export const getAll = (): TicketResponseDTO[] => {
  return tickets;
};

export const getById = (id: number): TicketResponseDTO | undefined => {
  return tickets.find((t) => t.id === id);
};

export const create = (
  ticket: Omit<TicketResponseDTO, "id">,
): TicketResponseDTO => {
  const newTicket = { id: nextId++, ...ticket };

  tickets.push(newTicket);

  return newTicket;
};

export const update = (id: number, data: Omit<TicketResponseDTO, "id">) => {
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) return undefined;

  tickets[index] = { id, ...data };

  return tickets[index];
};

export const remove = (id: number): boolean => {
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) return false;

  tickets.splice(index, 1);

  return true;
};
