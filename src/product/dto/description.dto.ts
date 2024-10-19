import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";



export class descriptionDto {
    @ApiProperty({example: 'Молоко 1л из крупного тц'})
    @IsNotEmpty()
    @MinLength(50, {message: 'The Description need be at least 50  letter'})
    text: string
}