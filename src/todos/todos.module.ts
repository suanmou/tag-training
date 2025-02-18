// src/todos/todos.module.ts
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { LowdbModule } from '../lowdb/lowdb.module';

@Module({
  imports: [LowdbModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
