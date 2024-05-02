import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../infra/database/database.module';
import { UserService } from './service/users.service';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './controller/user.controller';
import { registerProviders } from '../../../utils/helpers/register-providers/register-providers.helper';
import { CreateUserDTO } from './dto/create/create-user.dto';
import { UpdateUserDTO } from './dto/update/update-user.dto';

@Module({
  imports: [DatabaseModule],
  providers: registerProviders({
    entity: UserEntity,
    service: UserService,
    DTOS: {
      create: CreateUserDTO,
      update: UpdateUserDTO
    }
  }),
  controllers: [UsersController]
})
export class UserModule {}
