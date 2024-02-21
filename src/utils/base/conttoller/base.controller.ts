import { IBaseController } from './base-controller.interface';

export abstract class BaseController<T> implements IBaseController<T> {
  constructor() {}
  create: (createArgs: Omit<T, 'id'>) => Promise<T>;
  delete: (id: string) => Promise<T[]>;
  findAll: () => Promise<T[]>;
  findOne: (id: string) => Promise<T>;
  update: (id: string, updateArgs: Partial<T>) => Promise<T>;
}
