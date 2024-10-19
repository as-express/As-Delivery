import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class validateDto {
    @ApiProperty({example: '+998901112233', description: 'Phone number'})
    @IsNotEmpty()
    phone: string

    @ApiProperty({example: '1056', description: 'Code which you take from sms'})
    @IsNotEmpty()
    code: string

    @ApiProperty({example: '87654321', description: 'new Password'})
    @IsNotEmpty()
    password: string
}