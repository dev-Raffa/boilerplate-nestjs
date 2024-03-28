import { Test, TestingModule } from '@nestjs/testing';
import { IMockEntity } from '../../mocks/entity/entity.mock';
import { MockService } from '../../mocks/service/service.mock';
import { MockRepository } from '../../mocks/repository/repository.mock';
import { IRepository } from 'src/utils/interfaces/repository/repository.inteface';
import { NotFoundException } from '@nestjs/common';
import { MockDatabase } from '../../mocks/database/database.mock';

describe('SimpleService', () => {
  let service: MockService;
  let repository: IRepository<IMockEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'SERVICE',
          useClass: MockService
        },
        {
          provide: 'REPOSITORY',
          useClass: MockRepository
        }
      ]
    }).compile();

    service = module.get<MockService>('SERVICE');
    repository = module.get<IRepository<IMockEntity>>('REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    const req: Omit<IMockEntity, 'id'> = {
      name: 'teste',
      age: 24
    };

    it('should return a user when create with succes', async () => {
      const result = await service.add(req);

      expect(result).toEqual<IMockEntity>({
        id: MockDatabase.length,
        age: 24,
        name: 'teste'
      });
    });
  });

  describe('find', () => {
    it('should return all repository itens', async () => {
      const result = await service.getAll();
      expect(result).toEqual(MockDatabase);
    });
  });

  describe('findOneBy', () => {
    it('sould throw not found exception when id is invalid', async () => {
      expect(service.getOneById(4)).rejects.toThrow(NotFoundException);
    });

    it('should return one entity when id is found', async () => {
      const result = await service.getOneById(2);

      expect(result).toEqual(MockDatabase[1]);
    });
  });

  describe('update', () => {
    it('sould throw not found exception when id is invalid', async () => {
      expect(service.update(4, { age: 25, name: 'test' })).rejects.toThrow(
        NotFoundException
      );
    });

    it('should return entity update when updated successfully', async () => {
      const result = await service.update(2, { age: 39 });

      expect(result.age).toEqual(39);
    });
  });

  describe('delete', () => {
    it('sould throw not found exception when id is invalid', async () => {
      expect(service.delete(4)).rejects.toThrow(NotFoundException);
    });

    it('should return upadated repository', async () => {
      const result = await service.delete(1);

      expect(result).not.toContain({ id: 1, name: 'Jorge', age: 35 });
      expect(result.length).toEqual(2);
    });
  });
});
