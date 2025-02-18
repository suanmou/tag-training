import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LowdbService } from './lowdb/lowdb.service';
import { LowdbModule } from './lowdb/lowdb.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [LowdbModule, TodosModule],
  controllers: [AppController],
  providers: [AppService, LowdbService],
})
export class AppModule {}
