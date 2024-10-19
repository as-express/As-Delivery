import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class promoDto {
    @ApiProperty({example: 'AD123', description: 'Code'})
    @IsNotEmpty()
    code: string

    @ApiProperty({example: 1000, description: 'Sale Cash'})
    @IsNotEmpty()
    cash: string

    @ApiProperty({example: 10, description: 'Limit to use'})
    @IsNotEmpty()
    limit: number
}