import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class locationDto {
    @ApiProperty({example: 'Moscow'})
    @IsNotEmpty()
    title: string

    @ApiProperty({example: '43.341341'})
    @IsNotEmpty()
    long: number

    @ApiProperty({example: '64.234547'})
    @IsNotEmpty()
    lat: number
}