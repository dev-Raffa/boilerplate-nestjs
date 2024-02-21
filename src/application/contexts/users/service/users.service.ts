import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../../utils/base/service/base.service';
import { IUser } from '../entity/users.entity';

@Injectable()
export class UsersService extends BaseService<IUser> {
  getHello(): string {
    return 'Hello World!';
  }
}
