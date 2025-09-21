import { Controller, Post, Get, Put, Body, Delete, Param } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { GetUserDto } from './dtos/GetUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';


@Controller('user')
export class UserController {

    constructor(private readonly _userService: UserService) {}

    @Post('create')
    @ApiBody({ type: CreateUserDto })
    createUser(@Body() dto: CreateUserDto): Promise<GetUserDto> {
        return this._userService.createUser(dto);
    }

    @Get('get_all')
    getAllUsers(): Promise<Array<GetUserDto | null>> {
        return this._userService.getAllUsers();
    }
    
    @Get('get_by_id/:id')
    @ApiParam({ name: 'id', type: String })
    getUserById(@Param('id') id: string): Promise<GetUserDto> {
        return this._userService.getUserById(id);
    }

    @Put('update_by_id/:id')
    updateUserById(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<GetUserDto> {
        return this._userService.updateUserById(id, dto);
    }

    @Delete('delete_by_id/:id')
    deleteUserById(@Param('id') id: string): Promise<GetUserDto> {
        return this._userService.deleteUserById(id);
    }
}
