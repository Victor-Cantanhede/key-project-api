import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';


@Injectable()
export class AuthMasterGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {        
        const req = context.switchToHttp().getRequest();
        
        if (req.user.role !== 'MASTER') {
            throw new ForbiddenException('User without access permission (MASTER)');
        }

        return true;
    }
}