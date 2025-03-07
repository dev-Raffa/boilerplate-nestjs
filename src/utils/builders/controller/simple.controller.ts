import {
  Body,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { ISimpleService } from '../../interfaces/service/service.interface';
import { IBaseController } from '../../interfaces/controller/controller.interface';
import { CreateBodyInterceptor } from 'src/utils/interceptors/createRequest/create-request.interceptor';
import { UpdateBodyInterceptor } from 'src/utils/interceptors/updateRequest/update-request.interceptor';

export abstract class SimpleController<TEntity, TService>
  implements IBaseController<TEntity>
{
  constructor(
    @Inject('SERVICE')
    protected readonly service: ISimpleService<TEntity> & TService
  ) {}

  @Post()
  @UseInterceptors(CreateBodyInterceptor)
  async create(@Body('create') createArgs: Omit<TEntity, 'id'>) {
    return await this.service.add(createArgs);
  }

  @Get()
  async findAll(): Promise<TEntity[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<TEntity> {
    return await this.service.getOneById(+id);
  }

  @Patch(':id')
  @UseInterceptors(UpdateBodyInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body('update') updateArgs: Partial<TEntity>
  ): Promise<TEntity> {
    return await this.service.update(+id, updateArgs);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string): Promise<TEntity[]> {
    return await this.service.delete(+id);
  }
}
