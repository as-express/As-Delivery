import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class menuDto {
    @ApiProperty({example: 'Deserts'})
    @IsNotEmpty()
    title: string
}
