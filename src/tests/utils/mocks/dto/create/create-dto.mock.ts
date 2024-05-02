import { minLength } from '../../../../../utils/decorators/minLength/minLength.decorator';
import { IMockEntity } from '../../entity/entity.mock';
import { minValue } from '../../../../../utils/decorators/minValue/minValue.decorator';

export class CreateMockDTO implements Omit<IMockEntity, 'id'> {
  @minLength({ min: 3 })
  name: string;

  @minValue({ min: 16 })
  age: number;

  constructor(args: Omit<IMockEntity, 'id'>) {
    this.name = args.name;
    this.age = args.age;
  }
}
