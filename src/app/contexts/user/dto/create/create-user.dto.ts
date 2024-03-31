import { minLength } from '../../../../../utils/decorators/minLength/minLength.decorator';
import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';
import { minValue } from '../../../../../utils/decorators/minValue/minValue.decorator';

export class CreateUserDTO implements Omit<IUser, 'id'> {
  @minLength({ min: 3 })
  name: string;

  @minValue({ min: 16 })
  age: number;

  @isEmail()
  email: string;

  constructor(args: Omit<IUser, 'id'>) {
    this.name = args.name;
    this.age = args.age;
    this.email = args.email;
  }
}
