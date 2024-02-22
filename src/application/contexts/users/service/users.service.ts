import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../../utils/builders/service/base.service';
import { IUser } from 'src/domain/user/model/user.model';

@Injectable()
export class UsersService extends BaseService<IUser> {}
