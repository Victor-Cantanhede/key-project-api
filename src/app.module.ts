import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './_modules/user/user.module';
import { KeysModule } from './_modules/keys/keys.module';
import { AuthModule } from './_modules/auth/auth.module';

@Module({
  imports: [UserModule, KeysModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
