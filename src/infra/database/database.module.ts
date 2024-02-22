import { Module } from '@nestjs/common';
import { databaseProvider } from './provider/database.provider';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider]
})
export class DatabaseModule {}
