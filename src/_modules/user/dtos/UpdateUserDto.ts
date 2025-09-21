import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateUserDto {

    // Name validation: not empty, only letters and spaces, min length 3, max length 150
    @ApiPropertyOptional({
        example: 'John Doe',
        description: 'The name of the user',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Name should not be empty' })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(150, { message: 'Name must be at most 150 characters long' })
    name?: string;

    // Email validation: not empty, valid email format
    @ApiPropertyOptional({
        example: 'email@example.com',
        description: 'The email of the user',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;

    // Password validation: not empty, min length 8, max length 20, at least one uppercase letter, one lowercase letter, one number, one special character, no spaces
    @ApiPropertyOptional({
        example: 'P@ssw0rd!',
        description: 'The password of the user',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Password should not be empty' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password must be at most 20 characters long' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character (@$!%*?&)' })
    @Matches(/^\S*$/, { message: 'Password must not contain spaces' })
    password?: string;

    // Status validation: not empty, boolean
    @ApiPropertyOptional({
        example: true,
        description: 'The status of the user (active/inactive)',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Status should not be empty' })
    @IsBoolean({ message: 'Status must be a boolean value' })
    status?: boolean;

    constructor(dto: UpdateUserDto) {
        this.name = dto.name;
        this.email = dto.email;
        this.password = dto.password;
        this.status = dto.status;
    }
}