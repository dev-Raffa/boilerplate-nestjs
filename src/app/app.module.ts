import { Module } from '@nestjs/common';
import { UserModule } from './contexts/user/user.module';

@Module({
  imports: [UserModule]
})
export class AppModule {}
