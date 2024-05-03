import { IMockEntity } from '../../entity/entity.mock';
import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';
import { isString } from '../../../../../utils/decorators/isString/isString.decorator';

export class UpdateMockDTO implements Omit<IMockEntity, 'id'> {
  @isString({ options: { minLength: 3 } })
  name: string;

  @isNumber({ options: { min: 16 } })
  age: number;

  constructor(args: Partial<Omit<IMockEntity, 'id'>>) {
    args.name && (this.name = args.name);
    args.age && (this.age = args.age);
  }
}
