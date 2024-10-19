import { IsNotEmpty } from "class-validator";



export class basketDto {
    @IsNotEmpty()
    count: number
}