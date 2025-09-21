import { ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { IUserService } from './interfaces/IUserService';
import { CreateUserDto } from './dtos/CreateUserDto';
import { GetUserDto } from './dtos/GetUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { AppDatabase, DbUserType } from 'src/infrastructure/database/AppDatabase';


@Injectable()
export class UserService implements IUserService {

    constructor(private _db: AppDatabase) {}


    //##############################################################
    // CREATE USER
    //##############################################################
    async createUser(dto: CreateUserDto): Promise<GetUserDto> {
        try {
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

        } catch (error) {
            throw new ConflictException(`Failed to create user: ${error.message || 'Unknown error'}`);
        }
    }

    //##############################################################
    // GET ALL USERS
    //##############################################################
    async getAllUsers(): Promise<Array<GetUserDto | null>> {
        try {
            const users: Array<DbUserType | null> = await this._db.user.findMany();
            return users.map(user => user ? new GetUserDto(user) : null);
            
        } catch (error) {
            throw new ConflictException(`Failed to get users: ${error.message || 'Unknown error'}`);
        }
    }

    //##############################################################
    // GET USER BY ID
    //##############################################################
    async getUserById(id: string): Promise<GetUserDto> {
        try {
            const userId = parseInt(id);
            const user = await this._db.user.findUnique({ where: { id: userId } });

            if (!user) {
                throw new ConflictException('User not found');
            }
            return new GetUserDto(user);

        } catch (error) {
            throw new ConflictException(`Failed to get user: ${error.message || 'Unknown error'}`);
        }
    }

    //##############################################################
    // UPDATE USER BY ID
    //##############################################################
    async updateUserById(id: string, dto: UpdateUserDto): Promise<GetUserDto> {
        try {
            const userId = parseInt(id);
            const existingUser = await this._db.user.findUnique({ where: { id: userId } });

            if (!existingUser) {
                throw new ConflictException('User not found');
            }

            const newUserData = new UpdateUserDto({ ...dto });           

            if (newUserData.password) {
                const hashedPassword = await bcrypt.hash(newUserData.password, 10);
                newUserData.password = hashedPassword;
            }

            const updatedUser: DbUserType = await this._db.user.update({ where: { id: userId }, data: newUserData });
            return new GetUserDto(updatedUser);

        } catch (error) {
            throw new ConflictException(`Failed to update user: ${error.message || 'Unknown error'}`);
        }
    }

    //##############################################################
    // DELETE USER BY ID
    //##############################################################
    async deleteUserById(id: string): Promise<GetUserDto> {
        try {
            const userId = parseInt(id);
            const existingUser = await this._db.user.findUnique({ where: { id: userId } });
            
            if (!existingUser) {
                throw new ConflictException('User not found or already deleted');
            }

            const deletedUser: DbUserType = await this._db.user.delete({ where: { id: userId } });
            return new GetUserDto(deletedUser);

        } catch (error) {
            throw new ConflictException(`Failed to delete user: ${error.message || 'Unknown error'}`);
        }
    }
}
