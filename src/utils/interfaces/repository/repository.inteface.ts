export interface IRepository<T> {
  create: (args: Omit<T, 'id'>) => Promise<T>;
  save: (args: T) => Promise<T>;
  find: () => Promise<T[]>;
  findOneBy: (args: { id: number }) => Promise<T>;
  update: (id: number, args: Partial<T>) => Promise<T>;
  delete: (id: number) => Promise<T[]>;
}
