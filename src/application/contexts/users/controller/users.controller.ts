import { Controller } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { SimpleController } from '../../../../utils/builders/controller/simple.controller';
import { IUser } from '../../../../domain/user/model/user.model';

@Controller('users')
export class UsersController extends SimpleController<IUser, UsersService> {}
