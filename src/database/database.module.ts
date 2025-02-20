// src/database/database.module.ts
import { Module } from '@nestjs/common';
// import { NedbService } from './nedb.service';
import { createDbProvider } from './database.providers';

const providers = [
  createDbProvider('todos'), // 对应 todos 集合
  //   createDbProvider('users'), // 对应 users 集合
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
