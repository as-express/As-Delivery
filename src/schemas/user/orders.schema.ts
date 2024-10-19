import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";



@Schema()
export class Orders {
    @ApiProperty({example: 87289317})
    @Prop({default: 0, unique: true})
    no: number

    @ApiProperty({example: 'Products in way'})
    @Prop()
    description: string

    @ApiProperty({example: '20.23.10:34'})
    @Prop({default: Date.now})
    time: Date

    @ApiProperty({example: 'In Way'})
    @Prop({enum: ["In Way" ,"Delivered", "Canceled"], default: "In Way"})
    status: string

    @Prop({type: Types.ObjectId, ref: 'User'})
    owner: Types.ObjectId
}


export const orderSchema = SchemaFactory.createForClass(Orders)
