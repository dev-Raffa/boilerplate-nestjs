import { IRepository } from 'src/utils/base/repository/base.repository';
import { IMockBaseEntity, MockBaseEntity } from '../entity/base-entity.mock';

//export const MockBaseRepository: IMockBaseEntity[] = [];

export class MockBaseRepository implements IRepository<IMockBaseEntity> {
  repository: IMockBaseEntity[] = [];

  getId() {
    return this.repository.length + 1;
  }

  async create(args: Omit<IMockBaseEntity, 'id'>) {
    const id = this.getId();
    return new MockBaseEntity(id, args.name, args.age);
  }

  async save(args: IMockBaseEntity) {
    this.repository.push(args);
    return args;
  }

  async find() {
    return this.repository;
  }

  async findOneBy(args: { id: number }) {
    return this.repository.find((item) => item.id === args.id);
  }

  async update(id: number, args: Partial<IMockBaseEntity>) {
    const index = this.repository.findIndex((item) => item.id === id);
    Object.assign(this.repository[index], args);
    return this.repository[index];
  }

  async delete(id: number) {
    const index = this.repository.findIndex((item) => item.id === id);
    return this.repository.splice(index, 1);
  }
}
