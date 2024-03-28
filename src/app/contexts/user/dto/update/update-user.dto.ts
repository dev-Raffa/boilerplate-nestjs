import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';

export class UpdateUserDTO implements Partial<Omit<IUser, 'id'>> {
  name: string;
  age: number;
  @isEmail() email: string;

  constructor(args: Partial<Omit<IUser, 'id'>>) {
    args.name && (this.name = args.name);
    args.age && (this.age = args.age);
    args.email && (this.email = args.email);
  }
}
