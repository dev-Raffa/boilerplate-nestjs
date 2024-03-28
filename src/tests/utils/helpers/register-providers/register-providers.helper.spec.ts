import { Test, TestingModule } from '@nestjs/testing';

import { MockService } from '../../mocks/service/service.mock';
import { IRepository } from '../../../../utils/interfaces/repository/repository.inteface';
import { IMockEntity, MockEntity } from '../../mocks/entity/entity.mock';
import { registerProviders } from '../../../../utils/helpers/register-providers/register-providers.helper';
import { MockDatabaseModule } from '../../mocks/module/database/database-module.mock';

describe('registerProviders', () => {
  let service: MockService;
  let repository: IRepository<IMockEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: registerProviders({ entity: MockEntity, service: MockService })
    }).compile();

    service = module.get<MockService>('SERVICE');
    repository = module.get<IRepository<IMockEntity>>('REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
