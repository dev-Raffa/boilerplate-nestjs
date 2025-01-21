export interface IRepository<T> {
  create: (args: Omit<T, 'id'>) => Promise<T>;
  save: (args: T) => Promise<T>;
  find: () => Promise<T[]>;
  findOneBy: (args: Partial<T>) => Promise<T>;
  update: (id: number, args: Partial<T>) => Promise<T>;
  delete: (id: number) => Promise<T[]>;
}
