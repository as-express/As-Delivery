import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";



@Schema()
export class Canceled {
    @ApiProperty({example: 87289317})
    @Prop({unique: true})
    no: number
    
    @ApiProperty({example: 'Ordered by chance'})
    @Prop({enum: ["Ordered by chance", "I made a mistake with the order", "Dont want take this order"]})
    reason: string
    
    @ApiProperty({example: '460021381212234'})
    @Prop()
    card: string

    @ApiProperty({example: 'Sended'})
    @Prop({enum: ["Sended", "Cheking", "Approved", "Refused"], default: "Sended"})
    status: string

    @Prop()
    refusedReason: string

    @Prop()
    username: string

    @Prop({type: Types.ObjectId, ref: 'User'})
    owner: Types.ObjectId
}

export const canceledSchema = SchemaFactory.createForClass(Canceled)