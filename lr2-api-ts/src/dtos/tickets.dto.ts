export interface CreateTicketRequestDTO {
    subject: string;
    status: string;
    priority: string;
    message: string;
    author: string;
}

export interface UpdateTicketRequestDTO {
  subject: string;
  status: string;
  priority: string;
}

export interface TicketResponseDTO {
    id: number;
    subject: string;
    status: string;
    priority: string;
    message: string;
    author: string;
}