import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadUserTokenDto } from '../dtos/PayloadTokenDto';


export const CurrentUser = createParamDecorator(
    (data: keyof any, context: ExecutionContext) => {
        
        const req = context.switchToHttp().getRequest();
        const user = req.user as PayloadUserTokenDto;

        return data ? user?.[data] : user;
    }
);