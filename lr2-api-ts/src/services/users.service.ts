import * as repo from "../repositories/users.repository.js";

export function getAllUsers() {
  return repo.getAllUsers();
}

export function getUserById(id: number) {
  return repo.getUserById(id);
}

export function createUser(name: string) {
  return repo.createUser(name);
}

export function deleteUser(id: number) {
  return repo.deleteUser(id);
}
