import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/AuthUserDto';
import type { Response } from 'express';


@Controller('auth')
export class AuthController {
    
    constructor(private readonly _authService: AuthService) {}

    @Post('login')
    @ApiBody({ type: AuthUserDto })
    async authenticateUser(
        @Body() dto: AuthUserDto,
        @Res({ passthrough: true }) res: Response
        
    ): Promise<any> {

        const authResponse = await this._authService.authenticateUser(dto.email, dto.password);

        res.cookie('auth_token', authResponse.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 10 * 60 * 1000 // 10 minutes
        });

        return authResponse;
    }
}