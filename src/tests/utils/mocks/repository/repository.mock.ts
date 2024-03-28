import { IRepository } from 'src/utils/interfaces/repository/repository.inteface';
import { IMockEntity, MockEntity } from '../entity/entity.mock';
import { MockDatabase } from '../database/database.mock';

export class MockRepository implements IRepository<IMockEntity> {
  private repository: IMockEntity[] = MockDatabase;

  private getId() {
    return this.repository.length + 1;
  }

  async create(args: Omit<IMockEntity, 'id'>) {
    const id = this.getId();
    return new MockEntity(id, args.name, args.age);
  }

  async save(args: IMockEntity) {
    this.repository.push(args);
    return args;
  }

  async find() {
    return this.repository;
  }

  async findOneBy(args: { id: number }) {
    return this.repository.find((item) => item.id === args.id);
  }

  async update(id: number, args: Partial<IMockEntity>) {
    const index = this.repository.findIndex((item) => item.id === id);
    Object.assign(this.repository[index], args);
    return this.repository[index];
  }

  async delete(id: number) {
    const index = this.repository.findIndex((item) => item.id === id);
    return this.repository.splice(index, 1);
  }
}
