import { minLength } from '../../../../../utils/decorators/minLength/minLength.decorator';
import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';
import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';

export class CreateUserDTO implements Omit<IUser, 'id'> {
  @minLength({ min: 3 })
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
