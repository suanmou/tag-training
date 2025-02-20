// src/todos/todo.interface.ts
export interface Todo {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt?: Date;
}
