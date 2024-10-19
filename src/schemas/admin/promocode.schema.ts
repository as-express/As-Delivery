import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "../user/user.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Promo {
    @ApiProperty({example: 'AD123', description: 'Code'})
    @Prop({unique: true})
    code: string

    @ApiProperty({example: 1000, description: 'Sale Cash'})
    @Prop({default: 0})
    cash: number

    @ApiProperty({example: 10, description: 'Limit to use'})
    @Prop({default: 50})
    limit: number

    @ApiProperty({example: 0, description: 'User count'})
    @Prop({default: 0})
    used: number

    @ApiProperty({example: [], description: 'Users which use promocode'})
    @Prop({type: Types.ObjectId, ref: 'User'})
    usedBy: Types.ObjectId[]
}

export const promocodeSchema = SchemaFactory.createForClass(Promo) 
