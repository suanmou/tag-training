// src/todos/todos.service.ts
import { Injectable } from '@nestjs/common';
import { LowdbService } from '../lowdb/lowdb.service';
import { Todo } from './todo.interface';

@Injectable()
export class TodosService {
  private readonly collection = 'todos';

  constructor(private readonly lowdbService: LowdbService) {}

  async findAll(filter?: Partial<Todo>): Promise<Todo[]> {
    return this.lowdbService.find(this.collection, filter);
  }

  async findOne(id: string): Promise<Todo | undefined> {
    return this.lowdbService.findOne(this.collection, id);
  }

  async create(todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
    return this.lowdbService.create(this.collection, {
      ...todo,
      createdAt: new Date(),
    });
  }

  async update(
    id: string,
    updateData: Partial<Todo>,
  ): Promise<Todo | undefined> {
    return this.lowdbService.update(this.collection, id, updateData);
  }

  async delete(id: string): Promise<boolean> {
    return this.lowdbService.delete(this.collection, id);
  }
}
