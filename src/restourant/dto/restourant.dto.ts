import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";




export class restourantDto {
    @ApiProperty({example: 'Sushi-Cafe'})
    @IsNotEmpty()
    title: string

    @ApiProperty({example: 'this is sushi city'})
    @IsNotEmpty()
    description: string
}

