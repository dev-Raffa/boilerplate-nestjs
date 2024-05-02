import { Test, TestingModule } from '@nestjs/testing';
import { MockController } from '../../mocks/controller/controller.mock';
import { MockService } from '../../mocks/service/service.mock';
import { MockRepository } from '../../mocks/repository/repository.mock';
import { IMockEntity } from '../../mocks/entity/entity.mock';

describe('SimpleController', () => {
  let controller: MockController;
  let service: MockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockController],
      providers: [
        {
          provide: 'SERVICE',
          useClass: MockService
        },
        {
          provide: 'REPOSITORY',
          useClass: MockRepository
        },
        {
          provide: 'CREATE_DTO',
          useValue: undefined
        },
        {
          provide: 'UPDATE_DTO',
          useValue: undefined
        }
      ]
    }).compile();

    controller = module.get<MockController>(MockController);
    service = module.get<MockService>('SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const req: Omit<IMockEntity, 'id'> = {
      name: 'José',
      age: 58
    };

    it(`should call the service's add function`, async () => {
      jest.spyOn(service, 'add');

      await controller.create(req);

      expect(service.add).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it(`should call the service's getAll function`, async () => {
      jest.spyOn(service, 'getAll');

      await controller.findAll();

      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    const req: Omit<IMockEntity, 'id'> = {
      name: 'José',
      age: 58
    };

    it(`should call the service's getOneById function`, async () => {
      jest.spyOn(service, 'getOneById');

      await controller.create(req);
      await controller.findOne('1');

      expect(service.getOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    const req: Omit<IMockEntity, 'id'> = {
      name: 'José',
      age: 58
    };

    it(`should call the service's update function`, async () => {
      jest.spyOn(service, 'update');

      await controller.create(req);
      await controller.update('1', { age: 59 });

      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    const req: Omit<IMockEntity, 'id'> = {
      name: 'José',
      age: 58
    };

    it(`should call the service's delete function`, async () => {
      jest.spyOn(service, 'delete');

      await controller.create(req);
      await controller.delete('1');

      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
