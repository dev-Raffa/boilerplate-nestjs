import { BaseController } from '../../../../../utils/base/controller/base.controller';
import { IMockBaseEntity } from '../entity/base-entity.mock';
import { MockBaseService } from '../service/service.mock';

export class MockBaseController extends BaseController<
  IMockBaseEntity,
  MockBaseService
> {}
