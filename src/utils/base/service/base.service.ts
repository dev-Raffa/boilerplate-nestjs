import { Inject, NotFoundException } from '@nestjs/common';
import { IBaseEntity } from '../entity/base.entity';
import { IBaseService } from './base-service.interface';
import { IRepository } from '../repository/base.repository';

export abstract class BaseService<T extends IBaseEntity>
  implements IBaseService<T>
{
  constructor(
    @Inject('REPOSITORY')
    readonly repository: IRepository<T>
  ) {}

  protected async verifyId(id: number) {
    return await this.repository.findOneBy({ id: id });
  }

  async add(args: Omit<T, 'id'>): Promise<T> {
    const newEntity = await this.repository.create(args);
    return await this.repository.save(newEntity);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async getOneById(id: any): Promise<T> {
    const result = await this.repository.findOneBy({ id: id });

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: any, args: Partial<T>): Promise<T> {
    const verific = await this.verifyId(id);

    if (!verific) {
      throw new NotFoundException();
    }

    await this.repository.update(id, args);

    return await this.repository.findOneBy({ id: +id });
  }

  async delete(id: number): Promise<T[]> {
    const verific = await this.verifyId(id);

    if (!verific) {
      throw new NotFoundException();
    }
    await this.repository.delete(id);
    return await this.repository.find();
  }
}
