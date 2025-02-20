// src/database/nedb.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import Datastore from 'nedb';

@Injectable()
export class NedbService<T> implements OnModuleInit {
  private db: Datastore;

  constructor(private readonly collectionName: string) {}

  onModuleInit() {
    this.db = new Datastore({
      filename: `./data/${this.collectionName}.db`, // 数据文件路径
      autoload: true, // 自动加载数据
    });
  }

  // 插入文档
  async insert(doc: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.insert(doc, (err, newDoc) => {
        if (err) reject(err);
        else resolve(newDoc as T);
      });
    });
  }

  // 查询文档
  async find(query: any): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.find(query, (err, docs) => {
        if (err) reject(err);
        else resolve(docs as T[]);
      });
    });
  }

  // 更新文档
  async update(query: any, update: any, options: any = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.update(query, update, options, (err, numAffected) => {
        if (err) reject(err);
        else resolve(numAffected);
      });
    });
  }

  // 删除文档
  async remove(query: any, options: any = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.remove(query, options, (err, numRemoved) => {
        if (err) reject(err);
        else resolve(numRemoved);
      });
    });
  }
}
