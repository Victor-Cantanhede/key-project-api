import { UserRole } from 'src/_modules/user/dtos/GetUserDto';
import { DbUserType } from 'src/infrastructure/database/AppDatabase';


export class AuthUserResponseDto {
    user: {
        id: number;
        email: string;
        name: string;
        status: boolean;
        role: UserRole;
    };
    token: string;

    constructor(user: DbUserType, token: string) {
        this.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            status: user.status,
            role: user.role
        },
        this.token = token;
    }
}