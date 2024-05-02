import { minLength } from '../../../../../utils/decorators/minLength/minLength.decorator';
import { IMockEntity } from '../../entity/entity.mock';
import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';

export class UpdateMockDTO implements Omit<IMockEntity, 'id'> {
  @minLength({ min: 3 })
  name: string;

  @isNumber({ options: { min: 16 } })
  age: number;

  constructor(args: Partial<Omit<IMockEntity, 'id'>>) {
    args.name && (this.name = args.name);
    args.age && (this.age = args.age);
  }
}
