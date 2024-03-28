import { Module } from '@nestjs/common';
import { mockDatabaseProvider } from './provider/datasource.mock';

@Module({
  providers: [...mockDatabaseProvider],
  exports: [...mockDatabaseProvider]
})
export class MockDatabaseModule {}
