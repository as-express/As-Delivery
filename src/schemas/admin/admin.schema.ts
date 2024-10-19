import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";




@Schema()
export class Admin {
    @ApiProperty({example: 'Admin', description: 'Username'})
    @Prop({unique: true})
    username: string

    @ApiProperty({example: 'qwerty123456', description: 'password min 12'})
    @Prop()
    password: string
}

export const adminSchema = SchemaFactory.createForClass(Admin)