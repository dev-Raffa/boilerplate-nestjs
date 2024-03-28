import { Injectable } from '@nestjs/common';
import { SimpleService } from '../../../../utils/builders/service/simple.service';
import { IUser } from '../../../../app/contexts/user/model/user.model';

@Injectable()
export class UserService extends SimpleService<IUser> {}
