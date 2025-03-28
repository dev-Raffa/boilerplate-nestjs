import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../infra/database/database.module';
import { UserService } from './service/users.service';

import { UsersController } from './controller/user.controller';
import { registerProviders } from '../../../utils/helpers/register-providers/register-providers.helper';
import { APP_PIPE } from '@nestjs/core';
import { UserValidatorPipe } from './middlewares/pipes/validator/validator.pipe';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [DatabaseModule],
  providers: registerProviders(UserEntity, UserService, [
    {
      provide: APP_PIPE,
      useClass: UserValidatorPipe
    }
  ]),
  controllers: [UsersController]
})
export class UserModule {}
