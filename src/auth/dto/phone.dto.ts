import { ApiProperty } from "@nestjs/swagger";



export class  phoneDto {
    @ApiProperty({example: '+998901112233', description: 'Phone number'})
    phone: string
}