import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class promocodeDto {
    @ApiProperty({example: 'ASA1212'})
    @IsOptional()
    @IsString()
    promocode: string
}