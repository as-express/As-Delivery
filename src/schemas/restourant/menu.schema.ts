import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Product } from "../product/product.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Menu {
    @ApiProperty({example: 'Deserts'})
    @Prop({unique: true})
    title: string

    @ApiProperty({example: 0})
    @Prop({default: 0})
    foodsCount: number

    @ApiProperty({example: []})
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]})
    foods: Product[]

    @Prop({type: Types.ObjectId, ref: 'Restourant'})
    restourantId: Types.ObjectId 
}

export const menuSchema = SchemaFactory.createForClass(Menu)