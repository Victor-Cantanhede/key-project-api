import { GetUserDto } from 'src/_modules/user/dtos/GetUserDto';


export class GetKeyDto {
    id: number;
    name: string;
    keyvalue: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    user?: GetUserDto;

    constructor(dto: GetKeyDto) {
        this.id = dto.id;
        this.name = dto.name;
        this.keyvalue = dto.keyvalue;
        this.description = dto.description;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
        this.user = dto.user;
    }
}