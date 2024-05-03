import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';
import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';
import { isString } from '../../../../../utils/decorators/isString/isString.decorator';

export class CreateUserDTO implements Omit<IUser, 'id'> {
  @isString({ options: { minLength: 3 } })
  name: string;

  @isNumber({ options: { min: 16 } })
  age: number;

  @isEmail()
  email: string;

  constructor(args: Omit<IUser, 'id'>) {
    this.name = args.name;
    this.age = args.age;
    this.email = args.email;
  }
}
