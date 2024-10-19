import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class shopDto {
    @ApiProperty({example: 'Петеречка'})
    @IsNotEmpty()
    title: string

    @ApiProperty({example: 'Продукт маркер'})
    @IsNotEmpty()
    description: string
}