import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';

import { KeysService } from './keys.service';
import { CreateKeyDto } from './dtos/CreateKeyDto';
import { GetKeyDto } from './dtos/GetKeyDto';
import { UpdateKeyDto } from './dtos/UpdateKeyDto';


@Controller('keys')
export class KeysController {
    userIdTest = '1';

    constructor(private readonly _keysService: KeysService) {}

    @Post('create')
    @ApiBody({ type: CreateKeyDto })
    createKey(@Body() dto: CreateKeyDto): Promise<GetKeyDto> {
        return this._keysService.createKey(this.userIdTest, dto);
    }

    @Get('get_all')
    getAllKeys(): Promise<Array<GetKeyDto | null>> {
        return this._keysService.getAllKeys(this.userIdTest);
    }

    @Get('get_by_id/:keyId')
    @ApiParam({ name: 'keyId', type: String })
    getKeyById(@Param('keyId') keyId: string): Promise<GetKeyDto> {
        return this._keysService.getKeyById(this.userIdTest, keyId);
    }

    @Put('update_by_id/:keyId')
    @ApiParam({ name: 'keyId', type: String })
    @ApiBody({ type: UpdateKeyDto })
    updateKeyById(@Param('keyId') keyId: string, @Body() dto: UpdateKeyDto): Promise<GetKeyDto> {
        return this._keysService.updateKeyById(this.userIdTest, keyId, dto);
    }

    @Delete('delete_by_id/:keyId')
    @ApiParam({ name: 'keyId', type: String })
    deleteKeyById(@Param('keyId') keyId: string): Promise<GetKeyDto> {
        return this._keysService.deleteKeyById(this.userIdTest, keyId);
    }
}
