import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";



export class passwordDto {
    @ApiProperty({example: '12345678'})
    @MinLength(8, {message: 'oldPassword need be min 8'})
    oldPassword: string

    @ApiProperty({example: '87654321'})
    @MinLength(8, {message: 'newPassword need be min 8'})
    newPassword: string
}
