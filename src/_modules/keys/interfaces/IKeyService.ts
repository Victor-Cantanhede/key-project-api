import { CreateKeyDto } from '../dtos/CreateKeyDto';
import { GetKeyDto } from '../dtos/GetKeyDto';
import { UpdateKeyDto } from '../dtos/UpdateKeyDto';


export interface IKeyService {

    createKey(userId: string, dto: CreateKeyDto): Promise<GetKeyDto>;

    getAllKeys(userId: string): Promise<Array<GetKeyDto | null>>;

    getKeyById(userId: string, keyId: string): Promise<GetKeyDto>;

    updateKeyById(userId: string, keyId: string, dto: UpdateKeyDto): Promise<GetKeyDto>;

    deleteKeyById(userId: string, keyId: string): Promise<GetKeyDto>;
}