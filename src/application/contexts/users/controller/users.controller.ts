import { Controller } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { BaseController } from '../../../../utils/builders/controller/base.controller';
import { IUser } from '../../../../domain/user/model/user.model';

@Controller('users')
export class UsersController extends BaseController<IUser, UsersService> {}
