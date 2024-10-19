import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




@Schema()
export class Fake {
    @Prop({unique: true})
    username: string

    @Prop()
    avatar: string

    @Prop({unique: true})
    phone: string

    @Prop()
    password: string
}

export const fakeSchema = SchemaFactory.createForClass(Fake)