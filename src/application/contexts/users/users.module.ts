import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { DataSource } from 'typeorm';
import { UsersService } from './service/users.service';
import { UserEntity } from './entity/users.entity';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'SERVICE',
      useClass: UsersService
    },
    {
      provide: 'REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['DATA_SOURCE']
    }
  ],
  controllers: [UsersController]
})
export class UsersModule {}
