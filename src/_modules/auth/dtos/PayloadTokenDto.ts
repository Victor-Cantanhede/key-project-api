import { UserRole } from 'src/_modules/user/dtos/GetUserDto';


export abstract class PayloadUserTokenDto {
    readonly id: string; // Must be string because services parse id to number
    readonly email: string;
    readonly role: UserRole;

    constructor() {}
}