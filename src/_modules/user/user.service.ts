import { ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { IUserService } from './interfaces/IUserService';
import { CreateUserDto } from './dtos/CreateUserDto';
import { GetUserDto } from './dtos/GetUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { AppDatabase, DbUserType } from 'src/infrastructure/database/AppDatabase';


@Injectable()
export class UserService implements IUserService {

    constructor(private readonly _db: AppDatabase) {}


    //##############################################################
    // CREATE USER
    //##############################################################
    async createUser(dto: CreateUserDto): Promise<GetUserDto> {

        const newUser = new CreateUserDto(
            dto.name.toUpperCase(),
            dto.email,
            dto.password
        );

        const existingUser = await this._db.user.findUnique({ where: { email: newUser.email } });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;

        const createdUser: DbUserType = await this._db.user.create({ data: newUser });
        return new GetUserDto(createdUser);
    }

    //##############################################################
    // GET ALL USERS
    //##############################################################
    async getAllUsers(): Promise<Array<GetUserDto | null>> {

        const users: Array<DbUserType | null> = await this._db.user.findMany();
        return users.map(user => user ? new GetUserDto(user) : null);
    }

    //##############################################################
    // GET USER BY ID
    //##############################################################
    async getUserById(id: string): Promise<GetUserDto> {

        const userId = parseInt(id);
        const user = await this._db.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new ConflictException('User not found');
        }
        return new GetUserDto(user);
    }

    //##############################################################
    // UPDATE USER BY ID
    //##############################################################
    async updateUserById(id: string, dto: UpdateUserDto): Promise<GetUserDto> {

        const user = await this.getUserById(id);
        const newUserData = new UpdateUserDto(dto);           

        if (newUserData.password) {
            const hashedPassword = await bcrypt.hash(newUserData.password, 10);
            newUserData.password = hashedPassword;
        }

        const updatedUser: DbUserType = await this._db.user.update({ where: { id: user.id }, data: newUserData });
        return new GetUserDto(updatedUser);
    }

    //##############################################################
    // DELETE USER BY ID
    //##############################################################
    async deleteUserById(id: string): Promise<GetUserDto> {
        
        const user = await this.getUserById(id);
        const deletedUser: DbUserType = await this._db.user.delete({ where: { id: user.id } });

        return new GetUserDto(deletedUser);
    }

    //##############################################################
    // VERIFY USER BY ID
    // This method is only used to verify if a user exists by ID without returning the user data
    //##############################################################
    async verifyUserById(userId: string): Promise<void> {
        await this.getUserById(userId);
    }
}
