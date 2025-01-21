import { Inject, NotFoundException } from '@nestjs/common';
import { IBaseEntity } from '../../interfaces/entitty/entity.interface';
import { ISimpleService } from '../../interfaces/service/service.interface';
import { Repository } from 'typeorm';

export abstract class SimpleService<T extends IBaseEntity>
  implements ISimpleService<T>
{
  constructor(
    @Inject('REPOSITORY')
    readonly repository: Repository<T>
  ) {}

  protected async verifyId(id: number) {
    // @ts-expect-error id is not assignable
    return await this.repository.findOneBy({ id: id });
  }

  async add(args: Omit<T, 'id'>): Promise<T> {
    //@ts-expect-error id is not assignable to parameter of type 'Partial<T>
    const newEntity: T = await this.repository.create(args);
    return await this.repository.save(newEntity);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async getOneById(id: T['id']): Promise<T> {
    // @ts-expect-error id is not assignable
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

    // @ts-expect-error args is not assignable
    await this.repository.update(id, args);

    // @ts-expect-error id is not assignable
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
