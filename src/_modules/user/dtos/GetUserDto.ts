import { DbUserType } from 'src/infrastructure/database/AppDatabase';


export class GetUserDto {
    id: number;
    name: string;
    email: string;
    status: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: DbUserType) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.status = user.status;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}

export type UserRole = 'USER' | 'MASTER';