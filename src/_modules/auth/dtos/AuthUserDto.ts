import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';


export class AuthUserDto {

    @ApiProperty({
        example: 'myemail@example.com',
        description: 'The email of the user',
        required: true,
    })
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({
        example: 'P@ssw0rd!',
        description: 'The password of the user',
        required: true,
    })
    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;
}