import { Injectable } from '@nestjs/common';
import { SimpleService } from '../../../../utils/builders/service/simple.service';
import { IUser } from 'src/domain/user/model/user.model';

@Injectable()
export class UsersService extends SimpleService<IUser> {}
