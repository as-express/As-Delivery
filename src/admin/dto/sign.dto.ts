import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";



export class signDto {
    @ApiProperty({example: 'Admin', description: 'username'})
    @IsNotEmpty()
    username: string

    @ApiProperty({example: 'qwerty123456', description: 'password min 12'})
    @MinLength(12, {message: 'password need be min 12'})
    password: string
}