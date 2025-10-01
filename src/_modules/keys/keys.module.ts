import { Module } from '@nestjs/common';
import { KeysController } from './keys.controller';
import { KeysService } from './keys.service';
import { AppDatabase } from 'src/infrastructure/database/AppDatabase';
import { UserService } from '../user/user.service';
import { CryptoService } from './services/crypto.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [KeysController],
  providers: [KeysService, AppDatabase, UserService, CryptoService]
})
export class KeysModule {}
