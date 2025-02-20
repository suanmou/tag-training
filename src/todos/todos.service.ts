// src/todos/todos.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';
import { NedbService } from 'src/database/nedb.service';

@Injectable()
export class TodosService {
  constructor(
    @Inject('DB_TODOS') // 注入对应的令牌
    private readonly dbService: NedbService<Todo>,
  ) {}

  //   async create(todo: Omit<Todo, 'id' | 'createdAt'>) {
  async create(todo: Todo) {
    return this.dbService.insert(todo);
  }

  async findAll() {
    return this.dbService.find({});
  }

  async findById(id: string) {
    return this.dbService.find({ _id: id });
  }
}
