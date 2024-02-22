export interface IBaseController<T> {
  create: (createArgs: Omit<T, 'id'>) => Promise<T>;
  findAll: () => Promise<T[]>;
  findOne: (id: string) => Promise<T>;
  update: (id: string, updateArgs: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<T[]>;
}
