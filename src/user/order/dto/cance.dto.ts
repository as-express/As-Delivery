import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class canceDto {
    @ApiProperty({example: 'Ordered by chance'})
    @IsNotEmpty()
    reason: string
    
    @ApiProperty({example: '460021381212234'})
    @IsNotEmpty()
    card: string
}