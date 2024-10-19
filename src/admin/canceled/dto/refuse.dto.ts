import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class refuseDto {
    @ApiProperty({example: 'data is not correct'})
    @IsNotEmpty()
    refusedReason: string
}