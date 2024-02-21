import { Module } from '@nestjs/common';
import { databaseProvider } from './postgres/provider/postgres.provider';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider]
})
export class DatabaseModule {}
