import { Injectable, OnModuleInit } from '@nestjs/common';
// import { Low } from 'lowdb';
// import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { Todo } from '../todos/todo.interface';
import { v4 as uuidv4 } from 'uuid';

type Data = {
  todos: Todo[];
};

@Injectable()
export class LowdbService implements OnModuleInit {
  private db;

  async onModuleInit() {
    await this.initializeDB();
  }

  private async initializeDB() {
    const { Low } = await import('lowdb');
    const { JSONFile } = await import('lowdb/node');

    // import { JSONFile } from 'lowdb/node';

    const file = join(process.cwd(), 'db.json');
    const adapter = new JSONFile<Data>(file);

    this.db = new Low<Data>(adapter, { todos: [] });
    await this.db.read();

    // 初始化默认数据
    this.db.data ||= { todos: [] };
    await this.db.write();
  }

  // 通用操作方法
  async find<T extends keyof Data>(
    collection: T,
    predicate?: Partial<Data[T][number]>,
  ): Promise<Data[T][number][]> {
    return this.db.data[collection].filter((item) =>
      Object.entries(predicate || {}).every(
        ([key, value]) => item[key] === value,
      ),
    );
  }

  async findOne<T extends keyof Data>(
    collection: T,
    id: string,
  ): Promise<Data[T][number] | undefined> {
    return this.db.data[collection].find((item) => item.id === id);
  }

  async create<T extends keyof Data>(
    collection: T,
    item: Omit<Data[T][number], 'id'>,
  ): Promise<Data[T][number]> {
    const newItem = { ...item, id: uuidv4() };
    this.db.data[collection].push(newItem);
    await this.db.write();
    return newItem;
  }

  async update<T extends keyof Data>(
    collection: T,
    id: string,
    updateData: Partial<Data[T][number]>,
  ): Promise<Data[T][number] | undefined> {
    const index = this.db.data[collection].findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    this.db.data[collection][index] = {
      ...this.db.data[collection][index],
      ...updateData,
    };

    await this.db.write();
    return this.db.data[collection][index];
  }

  async delete<T extends keyof Data>(
    collection: T,
    id: string,
  ): Promise<boolean> {
    const initialLength = this.db.data[collection].length;
    this.db.data[collection] = this.db.data[collection].filter(
      (item) => item.id !== id,
    );

    if (this.db.data[collection].length === initialLength) return false;

    await this.db.write();
    return true;
  }
}
