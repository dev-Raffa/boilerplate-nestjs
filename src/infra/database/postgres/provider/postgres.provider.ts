import { Provider } from '@nestjs/common';
import { UserEntity } from 'src/application/contexts/users/entity/users.entity';
import { DataSource } from 'typeorm';

export const databaseProvider: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'r@ff@1994',
        database: 'testeApp',
        entities: [UserEntity],
        synchronize: true
      });

      return dataSource.initialize();
    }
  }
];
