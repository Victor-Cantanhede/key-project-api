import { Controller, Post, Get, Put, Body, Delete, Param, UseGuards, ForbiddenException } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { GetUserDto } from './dtos/GetUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMasterGuard } from '../auth/guards/auth-master.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PayloadUserTokenDto } from '../auth/dtos/PayloadTokenDto';
import { OwnerOrMasterGuard } from '../auth/guards/owner-master.guard';


@Controller('user')
export class UserController {
    
    constructor(private readonly _userService: UserService) {}
    
    @Post('create')
    @ApiBody({ type: CreateUserDto })
    createUser(@Body() dto: CreateUserDto): Promise<GetUserDto> {
        return this._userService.createUser(dto);
    }
    
    @Get('get_all')
    @UseGuards(AuthGuard, AuthMasterGuard)
    getAllUsers(): Promise<Array<GetUserDto | null>> {
        return this._userService.getAllUsers();
    }
    
    @Get('get_by_id/:id')
    @ApiParam({ name: 'id', type: String })
    @UseGuards(AuthGuard, OwnerOrMasterGuard)
    getUserById(
        @CurrentUser() user: PayloadUserTokenDto,
        @Param('id') id: string

    ): Promise<GetUserDto> {
        return this._userService.getUserById(id);
    }

    @Put('update_by_id/:id')
    @UseGuards(AuthGuard, OwnerOrMasterGuard)
    updateUserById(
        @CurrentUser() user: PayloadUserTokenDto,
        @Param('id') id: string, @Body() dto: UpdateUserDto

    ): Promise<GetUserDto> {
        return this._userService.updateUserById(id, dto);
    }

    @Delete('delete_by_id/:id')
    @UseGuards(AuthGuard, AuthMasterGuard)
    deleteUserById(@Param('id') id: string): Promise<GetUserDto> {
        return this._userService.deleteUserById(id);
    }
}
