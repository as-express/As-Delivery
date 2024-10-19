import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Types } from "mongoose";



@Schema()
export class Message {
    @Prop()
    text: string
}

export const messageSchema = SchemaFactory.createForClass(Message)


@Schema()
export class Notice {
    @ApiProperty({example: 0})
    @Prop({default: 0})
    count: number

    @ApiProperty({example: []})
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]})
    messages: Message[]
    
    @Prop({type: Types.ObjectId, ref: 'User'})
    owner: Types.ObjectId
}

export const noticeSchema = SchemaFactory.createForClass(Notice)