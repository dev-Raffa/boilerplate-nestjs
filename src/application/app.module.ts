import { Module } from '@nestjs/common';
import { UsersModule } from './contexts/users/users.module';

@Module({
  imports: [UsersModule]
})
export class AppModule {}
