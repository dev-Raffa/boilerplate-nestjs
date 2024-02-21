import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { IUser } from '../entity/users.entity';

@Controller('users')
export class UsersController {
  constructor(@Inject('SERVICE') private readonly service: UsersService) {}

  @Get()
  getHello() {
    return this.service.getAll();
  }

  @Post()
  async create(@Body() args: { name: string; age: number }): Promise<IUser> {
    console.log(args);
    return await this.service.add(args);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArgs: Partial<IUser>
  ): Promise<IUser> {
    console.log(id);
    return await this.service.update(+id, updateArgs);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IUser[]> {
    console.log(id);
    return await this.service.delete(+id);
  }
}
