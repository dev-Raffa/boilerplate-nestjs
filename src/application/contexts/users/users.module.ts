import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UsersService } from './service/users.service';
import { UserEntity } from './entity/users.entity';
import { UsersController } from './controller/users.controller';
import { registerProviders } from 'src/utils/helpers/register-providers/register-providers.helper';

@Module({
  imports: [DatabaseModule],
  providers: registerProviders(UserEntity, UsersService),
  controllers: [UsersController]
})
export class UsersModule {}
