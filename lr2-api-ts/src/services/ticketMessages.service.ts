import * as repo from "../repositories/ticketMessages.repository.js";

export function getAllMessages() {
  return repo.getAll();
}

export function getMessage(id: number) {
  return repo.getById(id);
}

export function createMessage(data: any) {
  return repo.create(data);
}

export function updateMessage(id: number, data: any) {
  return repo.update(id, data);
}

export function deleteMessage(id: number) {
  return repo.remove(id);
}
