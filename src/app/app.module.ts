import { Module } from '@nestjs/common';
import { UsersModule } from './contexts/user/user.module';

@Module({
  imports: [UsersModule]
})
export class AppModule {}
