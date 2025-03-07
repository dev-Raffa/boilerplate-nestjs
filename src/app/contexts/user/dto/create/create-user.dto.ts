import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { IUser } from '../../model/user.model';
import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';
import { isString } from '../../../../../utils/decorators/isString/isString.decorator';
import { isType } from 'src/utils/decorators/isType/isType.decorator';
import { IAdress } from '../../model/address.model';

export class Address implements IAdress {
  @isString({ options: { minLength: 5 } })
  street: string;

  constructor(street: string) {
    this.street = street;
  }
}

export class CreateUserDTO implements Omit<IUser, 'id'> {
  @isString({ options: { minLength: 3 } })
  name: string;

  @isNumber({ options: { min: 16 } })
  age: number;

  @isEmail({ nullable: true })
  emails: string[];

  @isType({ type: Address, isArray: true })
  addresses: IAdress[];

  constructor(args: Omit<IUser, 'id'>) {
    Object.assign(this, args);
  }
}
