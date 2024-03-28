import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';

export class CreateUserDTO implements Omit<IUser, 'id'> {
  name: string;
  age: number;
  @isEmail() email: string;

  constructor(args: Omit<IUser, 'id'>) {
    this.name = args.name;
    this.age = args.age;
    this.email = args.email;
  }
}
