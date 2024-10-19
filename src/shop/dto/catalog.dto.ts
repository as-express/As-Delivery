import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class catalogDto {
    @ApiProperty({example: 'Молочные продукты'})
    @IsNotEmpty()
    title: string
}