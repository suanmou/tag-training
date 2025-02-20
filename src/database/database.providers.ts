// src/database/database.providers.ts
import { Provider } from '@nestjs/common';
import { NedbService } from './nedb.service';

export const createDbProvider = (collectionName: string): Provider => ({
  provide: `DB_${collectionName.toUpperCase()}`, // 唯一令牌，如 DB_NOTES
  useFactory: () => new NedbService(collectionName),
});
