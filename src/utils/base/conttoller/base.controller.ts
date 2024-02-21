import { Body, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { IBaseService } from '../service/base-service.interface';
import { IBaseController } from './base-controller.interface';

export abstract class BaseController<T, S> implements IBaseController<T> {
  constructor(
    @Inject('SERVICE') protected readonly service: IBaseService<T> & S
  ) {}

  @Post()
  async create(@Body() createArgs: Omit<T, 'id'>) {
    return await this.service.add(createArgs);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return await this.service.getAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    return await this.service.getOneById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArgs: Partial<T>
  ): Promise<T> {
    return await this.service.update(+id, updateArgs);
  }

  @Delete(':id')
  async delete(id: string): Promise<T[]> {
    return await this.service.delete(+id);
  }
}
