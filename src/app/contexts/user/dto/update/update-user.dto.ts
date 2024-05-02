import { minValue } from 'src/utils/decorators/minValue/minValue.decorator';
import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';
import { minLength } from 'src/utils/decorators/minLength/minLength.decorator';

export class UpdateUserDTO implements Partial<Omit<IUser, 'id'>> {
  @minLength({ min: 3 })
  name: string;

  @minValue({ min: 16 })
  age: number;

  @isEmail()
  email: string;

  constructor(args: Partial<Omit<IUser, 'id'>>) {
    args.name && (this.name = args.name);
    args.age && (this.age = args.age);
    args.email && (this.email = args.email);
  }
}
