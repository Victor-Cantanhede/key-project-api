import { ConflictException, Injectable } from '@nestjs/common';

import { IKeyService } from './interfaces/IKeyService';
import { AppDatabase, DbKeyType } from 'src/infrastructure/database/AppDatabase';
import { UserService } from '../user/user.service';
import { CreateKeyDto } from './dtos/CreateKeyDto';
import { GetKeyDto } from './dtos/GetKeyDto';
import { CryptoService } from './services/crypto.service';
import { UpdateKeyDto } from './dtos/UpdateKeyDto';


@Injectable()
export class KeysService implements IKeyService {
    
    constructor(
        private readonly _db: AppDatabase,
        private readonly _userService: UserService,
        private readonly _cryptoService: CryptoService
    ) {}


    //##############################################################
    // CREATE KEY
    //##############################################################
    async createKey(userId: string, dto: CreateKeyDto): Promise<GetKeyDto> {

        await this._userService.verifyUserById(userId);

        const newKey: CreateKeyDto = dto;
        const encrypt = this._cryptoService.encrypt(newKey.keyvalue);

        newKey.keyvalue = `${encrypt.encrypted}:${encrypt.iv}:${encrypt.tag}`;

        const createdKey: DbKeyType = await this._db.key.create({
            data: { ...newKey, userId: parseInt(userId) }
        });

        return new GetKeyDto(createdKey);
    }

    //##############################################################
    // GET ALL KEYS
    //##############################################################
    async getAllKeys(userId: string): Promise<Array<GetKeyDto | null>> {

        await this._userService.verifyUserById(userId);

        const keys: Array<DbKeyType | null> = await this._db.key.findMany({
            where: { userId: parseInt(userId) }
        });

        return keys.map(key => {
            if (!key) return null;

            return new GetKeyDto({
                ...key,
                keyvalue: this._cryptoService.decrypt(key.keyvalue)
            });
        });
    }

    //##############################################################
    // GET KEY BY ID
    //##############################################################
    async getKeyById(userId: string, keyId: string): Promise<GetKeyDto> {

        await this._userService.verifyUserById(userId);

        const key: DbKeyType | null = await this._db.key.findUnique({
            where: {
                id: parseInt(keyId),
                userId: parseInt(userId)
            }
        });

        if (!key) {
            throw new ConflictException('Key not found');
        }

        return new GetKeyDto({
            ...key,
            keyvalue: this._cryptoService.decrypt(key.keyvalue)
        });
    }

    //##############################################################
    // UPDATE KEY BY ID
    //##############################################################
    async updateKeyById(userId: string, keyId: string, dto: UpdateKeyDto): Promise<GetKeyDto> {

        await this._userService.verifyUserById(userId);
        const key = await this.getKeyById(userId, keyId);

        const newKeyData: UpdateKeyDto = dto;
        const encrypt = this._cryptoService.encrypt(newKeyData.keyvalue);

        newKeyData.keyvalue = `${encrypt.encrypted}:${encrypt.iv}:${encrypt.tag}`;

        const updatedKey: DbKeyType = await this._db.key.update({
            where: { id: key.id },
            data: newKeyData
        });
        return new GetKeyDto(updatedKey);
    }

    //##############################################################
    // DELETE KEY BY ID
    //##############################################################
    async deleteKeyById(userId: string, keyId: string): Promise<GetKeyDto> {

        await this._userService.verifyUserById(userId);
        const key = await this.getKeyById(userId, keyId);

        const deletedKey: DbKeyType = await this._db.key.delete({
            where: { id: key.id }
        });
        return new GetKeyDto(deletedKey);
    }
}
