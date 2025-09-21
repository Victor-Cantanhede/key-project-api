import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppDatabase } from 'src/infrastructure/database/AppDatabase';

@Module({
  controllers: [UserController],
  providers: [UserService, AppDatabase]
})
export class UserModule {}
