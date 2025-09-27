import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { AppDatabase, DbUserType } from 'src/infrastructure/database/AppDatabase';
import { AuthUserResponseDto } from './dtos/AuthUserResponseDto';
import { GetUserDto } from '../user/dtos/GetUserDto';


@Injectable()
export class AuthService {

    constructor(
        private readonly _db: AppDatabase,
        private readonly _jwtService: JwtService
    ) {}


    //##############################################################
    // AUTHENTICATE USER
    //##############################################################
    async authenticateUser(email: string, password: string): Promise<AuthUserResponseDto> {

        const user = await this._db.user.findUnique({ where: { email } });
        if (!user) {
            throw new ConflictException('User not registered or invalid email');
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new ConflictException('Invalid password');
        }
        
        const payload = { sub: user.id, email: user.email };
        const token = await this._jwtService.signAsync(payload);

        return new AuthUserResponseDto(user, token);
    }
}