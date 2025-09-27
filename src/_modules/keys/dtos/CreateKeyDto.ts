import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateKeyDto {

    // Name validation: not empty, min length 3, max length 150
    @ApiProperty({
        example: 'my-key-name',
        description: 'The name of the key',
        required: true,
    })
    @IsNotEmpty({ message: 'Key name should not be empty' })
    @MinLength(3, { message: 'Key name must be at least 3 characters long' })
    @MaxLength(150, { message: 'Key name must be at most 150 characters long' })
    @Transform(({ value }) => value.toUpperCase().trim())
    name: string;

    // Key value validation: not empty, max length 150
    @ApiProperty({
        example: 'my-key-value',
        description: 'The value of the key',
        required: true
    })
    @IsNotEmpty({ message: 'Key value should not be empty' })
    @MaxLength(150, { message: 'Key value must be at most 150 characters long' })
    keyvalue: string;

    // Description validation: optional, not empty if provided, max length 300
    @ApiProperty({
        example: 'This is my API key for external service',
        description: 'A brief description of the key',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Description should not be empty', each: true })
    @MaxLength(300, { message: 'Description must be at most 300 characters long' })
    description?: string;
}