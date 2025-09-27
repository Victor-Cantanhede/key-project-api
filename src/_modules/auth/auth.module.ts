import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppDatabase } from 'src/infrastructure/database/AppDatabase';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AppDatabase],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '10m' },
        })
    ]
})
export class AuthModule {}