import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserService } from './service/users.service';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './controller/user.controller';
import { registerProviders } from 'src/utils/helpers/register-providers/register-providers.helper';

@Module({
  imports: [DatabaseModule],
  providers: registerProviders({
    entity: UserEntity,
    service: UserService
  }),
  controllers: [UsersController]
})
export class UsersModule {}
