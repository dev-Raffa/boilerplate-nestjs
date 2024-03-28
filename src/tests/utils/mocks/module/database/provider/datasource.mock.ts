import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MockEntity } from '../../../entity/entity.mock';
import { Provider } from '@nestjs/common';

export const mockDatabaseProvider: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [MockEntity],
        synchronize: true
      });

      return dataSource.initialize();
    }
  }
];
