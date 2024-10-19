import { IsNotEmpty } from "class-validator";



export class orderDto {
        @IsNotEmpty()
    title: string

    @IsNotEmpty()
    long: string

    @IsNotEmpty()
    lat: string
}