import { SimpleController } from '../../../../utils/builders/controller/simple.controller';
import { IMockEntity } from '../entity/entity.mock';
import { MockService } from '../service/service.mock';

export class MockController extends SimpleController<
  IMockEntity,
  MockService
> {}
