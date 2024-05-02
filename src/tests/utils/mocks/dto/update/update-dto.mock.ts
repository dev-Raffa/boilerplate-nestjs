import { minLength } from '../../../../../utils/decorators/minLength/minLength.decorator';
import { IMockEntity } from '../../entity/entity.mock';
import { minValue } from '../../../../../utils/decorators/minValue/minValue.decorator';

export class UpdateMockDTO implements Omit<IMockEntity, 'id'> {
  @minLength({ min: 3 })
  name: string;

  @minValue({ min: 16 })
  age: number;

  constructor(args: Partial<Omit<IMockEntity, 'id'>>) {
    args.name && (this.name = args.name);
    args.age && (this.age = args.age);
  }
}
