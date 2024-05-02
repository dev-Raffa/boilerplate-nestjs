import { isNumber } from '../../../../../utils/decorators/isNumber/isNumber.decorator';
import { minLength } from '../../../../../utils/decorators/minLength/minLength.decorator';
import { IMockEntity } from '../../entity/entity.mock';

export class CreateMockDTO implements Omit<IMockEntity, 'id'> {
  @minLength({ min: 3 })
  name: string;

  @isNumber({ options: { min: 16 } })
  age: number;

  constructor(args: Omit<IMockEntity, 'id'>) {
    this.name = args.name;
    this.age = args.age;
  }
}
