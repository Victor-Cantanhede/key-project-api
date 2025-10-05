import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './_modules/user/user.module';
import { KeysModule } from './_modules/keys/keys.module';
import { AuthModule } from './_modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${ process.env.NODE_ENV || 'development' }`
    }),
    UserModule,
    KeysModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
