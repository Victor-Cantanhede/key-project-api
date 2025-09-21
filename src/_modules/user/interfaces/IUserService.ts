import { CreateUserDto } from '../dtos/CreateUserDto';
import { GetUserDto } from '../dtos/GetUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';


export interface IUserService {
    
    createUser(dto: CreateUserDto): Promise<GetUserDto>;

    getAllUsers(): Promise<Array<GetUserDto | null>>;

    getUserById(id: string): Promise<GetUserDto>;

    updateUserById(id: string, dto: UpdateUserDto): Promise<GetUserDto>;

    deleteUserById(id: string): Promise<GetUserDto>;
}