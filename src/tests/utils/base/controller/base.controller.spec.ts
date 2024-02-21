import { Test, TestingModule } from '@nestjs/testing';
import { MockBaseController } from '../mocks/controller/controller.mock';
import { MockBaseService } from '../mocks/service/service.mock';
import { MockBaseRepository } from '../mocks/repository/base-repository.mock';
import { IMockBaseEntity } from '../mocks/entity/base-entity.mock';

describe('BaseController', () => {
  let controller: MockBaseController;
  let service: MockBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockBaseController],
      providers: [
        {
          provide: 'SERVICE',
          useClass: MockBaseService
        },
        {
          provide: 'REPOSITORY',
          useClass: MockBaseRepository
        }
      ]
    }).compile();

    controller = module.get<MockBaseController>(MockBaseController);
    service = module.get<MockBaseService>('SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const req: Omit<IMockBaseEntity, 'id'> = {
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
    const req: Omit<IMockBaseEntity, 'id'> = {
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
    const req: Omit<IMockBaseEntity, 'id'> = {
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
    const req: Omit<IMockBaseEntity, 'id'> = {
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
