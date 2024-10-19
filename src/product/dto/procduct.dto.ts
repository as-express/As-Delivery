import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";




export class productDto {
    @ApiProperty({example: 'Молоко'})
    @IsNotEmpty()
    title: string

    @ApiProperty({example: 500})
    @IsNotEmpty()
    price: number

    @ApiProperty({example: 70})
    @IsNotEmpty()
    weight: number
}
