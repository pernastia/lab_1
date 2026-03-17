type User = {
  id: number;
  name: string;
};

const users: User[] = [];
let nextId = 1;

export function getAllUsers() {
  return users;
}

export function getUserById(id: number) {
  return users.find((u) => u.id === id);
}

export function createUser(name: string) {
  const user: User = {
    id: nextId++,
    name,
  };

  users.push(user);
  return user;
}

export function updateUser(id: number, name: string) {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.name = name;
  return user;
}

export function deleteUser(id: number) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}
