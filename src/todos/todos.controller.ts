// src/todos/todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findById(id);
  }

  @Post()
  //   create(@Body() todo: Omit<Todo, 'id' | 'createdAt'>) {
  create(@Body() todo: Todo) {
    return this.todosService.create(todo);
  }

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() updateData: Partial<Todo>) {
  //     return this.todosService.update(id, updateData);
  //   }

  //   @Delete(':id')
  //   delete(@Param('id') id: string) {
  //     return this.todosService.delete(id);
  //   }
}
