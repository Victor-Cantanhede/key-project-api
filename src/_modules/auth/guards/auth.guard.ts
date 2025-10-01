import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadUserTokenDto } from '../dtos/PayloadTokenDto';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly _jwtService: JwtService) {}


    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest();

        const token = req.cookies?.['auth_token'];
        if (!token) {
            throw new UnauthorizedException('User not authenticated, please log in and try again');
        }

        await this._jwtService.verifyAsync(token)
            .then((payload: PayloadUserTokenDto) => {
                req.user = payload;
            })
            .catch(() => {
                throw new UnauthorizedException('User not authenticated, please log in and try again');
            });

        return true;
    }
}