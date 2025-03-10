import { isEmail } from '../../../../../utils/decorators/isEmail/isEmail.decorator';
import { ERoles, IUser } from '../../model/user.model';
import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';
import { isString } from '../../../../../utils/decorators/isString/isString.decorator';
import { Address } from '../create/create-user.dto';
import { isType } from 'src/utils/decorators/isType/isType.decorator';
import { isEnum } from 'src/utils/decorators/isEnum/isEnum.decorator';

export class UpdateUserDTO implements Partial<Omit<IUser, 'id'>> {
  @isString({ options: { minLength: 3 }, nullable: true })
  name?: string;

  @isNumber({ options: { min: 16 }, nullable: true })
  age?: number;

  @isEmail()
  email?: string;

  @isType({ type: Address, isArray: true, nullable: true })
  addresses?: Address[];

  @isEnum({ enum: ERoles })
  role?: keyof typeof ERoles;

  constructor(args: Partial<Omit<IUser, 'id'>>) {
    Object.assign(this, args);
  }
}
