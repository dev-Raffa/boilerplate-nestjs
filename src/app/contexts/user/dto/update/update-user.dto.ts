import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';
import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';
import { isString } from '../../../../../utils/decorators/isString/isString.decorator';
import { Address } from '../create/create-user.dto';
import { isType } from 'src/utils/decorators/isType/isType.decorator';

export class UpdateUserDTO implements Partial<Omit<IUser, 'id'>> {
  @isString({ options: { minLength: 3 } })
  name: string;

  @isNumber({ options: { min: 16 } })
  age: number;

  @isEmail()
  email: string;

  @isType({ type: Address, isArray: true })
  addresses: Address[];

  constructor(args: Partial<Omit<IUser, 'id'>>) {
    args.name && (this.name = args.name);
    args.age && (this.age = args.age);
    args.email && (this.email = args.email);
    args.addresses && (this.addresses = args.addresses);
  }
}
