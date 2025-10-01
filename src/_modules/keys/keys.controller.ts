import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';

import { KeysService } from './keys.service';
import { CreateKeyDto } from './dtos/CreateKeyDto';
import { GetKeyDto } from './dtos/GetKeyDto';
import { UpdateKeyDto } from './dtos/UpdateKeyDto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PayloadUserTokenDto } from '../auth/dtos/PayloadTokenDto';


@UseGuards(AuthGuard)
@Controller('keys')
export class KeysController {

    constructor(private readonly _keysService: KeysService) {}

    @Post('create')
    @ApiBody({ type: CreateKeyDto })
    createKey(
        @CurrentUser() user: PayloadUserTokenDto,
        @Body() dto: CreateKeyDto
        
    ): Promise<GetKeyDto> {
        return this._keysService.createKey(user.id, dto);
    }

    @Get('get_all')
    getAllKeys(@CurrentUser() user: PayloadUserTokenDto): Promise<Array<GetKeyDto | null>> {
        return this._keysService.getAllKeys(user.id);
    }

    @Get('get_by_id/:keyId')
    @ApiParam({ name: 'keyId', type: String })
    getKeyById(
        @CurrentUser() user: PayloadUserTokenDto,
        @Param('keyId') keyId: string

    ): Promise<GetKeyDto> {
        return this._keysService.getKeyById(user.id, keyId);
    }

    @Put('update_by_id/:keyId')
    @ApiParam({ name: 'keyId', type: String })
    @ApiBody({ type: UpdateKeyDto })
    updateKeyById(
        @CurrentUser() user: PayloadUserTokenDto,
        @Param('keyId') keyId: string, @Body() dto: UpdateKeyDto

    ): Promise<GetKeyDto> {
        return this._keysService.updateKeyById(user.id, keyId, dto);
    }

    @Delete('delete_by_id/:keyId')
    @ApiParam({ name: 'keyId', type: String })
    deleteKeyById(
        @CurrentUser() user: PayloadUserTokenDto,
        @Param('keyId') keyId: string
        
    ): Promise<GetKeyDto> {
        return this._keysService.deleteKeyById(user.id, keyId);
    }
}
