import { Controller } from '@nestjs/common';
import { UserService } from '../service/users.service';
import { SimpleController } from '../../../../utils/builders/controller/simple.controller';
import { IUser } from '../model/user.model';

@Controller('users')
export class UsersController extends SimpleController<IUser, UserService> {}
