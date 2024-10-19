import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class reviewDto {
    @ApiProperty({example: 5})
    @IsNotEmpty()
    stars: number

    @ApiProperty({example: 'good sushies'})
    @IsNotEmpty()
    text: string
}