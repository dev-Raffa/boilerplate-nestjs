import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../infra/database/database.module';
import { UserService } from './service/users.service';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './controller/user.controller';
import { registerProviders } from '../../../utils/helpers/register-providers/register-providers.helper';
import { APP_PIPE } from '@nestjs/core';
import { UserValidatorPipe } from './middlewares/validator/user-validator.pipe';

@Module({
  imports: [DatabaseModule],
  providers: registerProviders({
    entity: UserEntity,
    service: UserService,
    others: [{ provide: APP_PIPE, useClass: UserValidatorPipe }]
  }),
  controllers: [UsersController]
})
export class UserModule {}
