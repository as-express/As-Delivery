import { IsNotEmpty } from "class-validator";



export class otpDto {
    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    code: string
}