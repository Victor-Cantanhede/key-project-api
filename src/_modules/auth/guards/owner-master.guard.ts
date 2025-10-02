import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PayloadUserTokenDto } from '../dtos/PayloadTokenDto';


@Injectable()
export class OwnerOrMasterGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();

        const user = req.user as PayloadUserTokenDto;
        const params = req.params as { id: string };
        const targetUserId = params.id;

        if (user.id === targetUserId || user.role === 'MASTER') {
            return true;
        }

        throw new ForbiddenException('Only MASTER or the owner can perform this action');
    }
}