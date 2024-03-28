export interface ISimpleService<T> {
  add: (args: Omit<T, 'id'>) => Promise<T>;
  getAll: () => Promise<T[]>;
  getOneById: (id: number) => Promise<T>;
  update: (id: any, args: Partial<T>) => Promise<T>;
  delete: (id: number) => Promise<T[]>;
}
