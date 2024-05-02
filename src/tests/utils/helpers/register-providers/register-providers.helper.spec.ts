import { Test, TestingModule } from '@nestjs/testing';

import { MockService } from '../../mocks/service/service.mock';
import { IRepository } from '../../../../utils/interfaces/repository/repository.inteface';
import { IMockEntity, MockEntity } from '../../mocks/entity/entity.mock';
import { registerProviders } from '../../../../utils/helpers/register-providers/register-providers.helper';
import { MockDatabaseModule } from '../../mocks/module/database/database-module.mock';
import { CreateMockDTO } from '../../mocks/dto/create/create-dto.mock';
import { UpdateMockDTO } from '../../mocks/dto/update/update-dto.mock';
import { Type } from '@nestjs/common';

describe('registerProviders', () => {
  let service: MockService;
  let repository: IRepository<IMockEntity>;
  let createDTO: Type<any> | undefined;
  let updateDTO: Type<any> | undefined;

  it('should defined service and repository, updateDTO and createDTO are undefined ', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: registerProviders({ entity: MockEntity, service: MockService })
    }).compile();

    service = module.get<MockService>('SERVICE');
    repository = module.get<IRepository<IMockEntity>>('REPOSITORY');
    createDTO = module.get<undefined>('CREATE_DTO');
    updateDTO = module.get<undefined>('UPDATE_DTO');

    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(createDTO).toBe(undefined);
    expect(updateDTO).toBe(undefined);
  });

  it('should defined service, repository, updateDTO and createDTO', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: registerProviders({
        entity: MockEntity,
        service: MockService,
        DTOS: { create: CreateMockDTO, update: UpdateMockDTO }
      })
    }).compile();

    service = module.get<MockService>('SERVICE');
    repository = module.get<IRepository<IMockEntity>>('REPOSITORY');
    createDTO = module.get<Type<any>>('CREATE_DTO');
    updateDTO = module.get<Type<any>>('UPDATE_DTO');

    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(createDTO).toBeDefined();
    expect(updateDTO).toBeDefined();
  });
});
