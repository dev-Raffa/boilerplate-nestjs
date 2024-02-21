import { BaseController } from '../../../../../utils/base/conttoller/base.controller';
import { IMockBaseEntity } from '../entity/base-entity.mock';
import { MockBaseService } from '../service/service.mock';

export class MockBaseController extends BaseController<
  IMockBaseEntity,
  MockBaseService
> {}
