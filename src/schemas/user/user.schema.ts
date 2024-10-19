import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";




@Schema()
export class User {
    @ApiProperty({example: 'Alex', description: 'Username'})
    @Prop({unique: true})
    username: string

    @ApiProperty({example: 'avatat.jpeg', description: 'image by form-data'})
    @Prop({default: 'static.png'})
    avatar: string

    @ApiProperty({example: '+998901112233', description: 'Phone Number'})
    @Prop({unique: true})
    phone: string

    @ApiProperty({example: '12345678', description: 'password min 8'})
    @Prop()
    password: string

    @Prop({enum: ['User' , 'Admin', 'Superadmin'], default: 'User'})
    role: string
}

export const userSchema = SchemaFactory.createForClass(User)