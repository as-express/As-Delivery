import { ApiProperty } from "@nestjs/swagger";
import { MinLength, IsNotEmpty } from "class-validator";


export class signupDto {
    @ApiProperty({example: 'Alex', description: 'Username'})
    @IsNotEmpty()
    username: string

    @ApiProperty({example: '+998901112233', description: 'Phone number'})
    @IsNotEmpty()
    phone: string

    @ApiProperty({example: '12345678', description: 'password'})
    @MinLength(8, {message: 'Password need be min 8 words'})
    password: string
}