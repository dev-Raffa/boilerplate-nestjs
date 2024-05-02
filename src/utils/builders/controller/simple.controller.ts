import {
  Body,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes
} from '@nestjs/common';
import { ISimpleService } from '../../interfaces/service/service.interface';
import { IBaseController } from '../../interfaces/controller/controller.interface';
import { CreateDTOPipe } from '../../pipes/createDTO/createDTO.pipe';
import { UpdateDTOPipe } from '../../pipes/updateDTO/update.pipe';

export abstract class SimpleController<T, S> implements IBaseController<T> {
  constructor(
    @Inject('SERVICE') protected readonly service: ISimpleService<T> & S
  ) {}

  @Post()
  @UsePipes(CreateDTOPipe)
  async create(@Body() createArgs: Omit<T, 'id'>) {
    return await this.service.add(createArgs);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<T> {
    return await this.service.getOneById(+id);
  }

  @Patch(':id')
  @UsePipes(UpdateDTOPipe)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateArgs: Partial<T>
  ): Promise<T> {
    return await this.service.update(+id, updateArgs);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string): Promise<T[]> {
    return await this.service.delete(+id);
  }
}
