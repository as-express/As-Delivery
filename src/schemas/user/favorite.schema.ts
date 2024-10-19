import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Product } from "../product/product.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Favorite {
    @ApiProperty({example: '1'})
    @Prop({default: 0})
    count: number

    @ApiProperty({example: []})
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]})
    products: Product[]

    @ApiProperty({example: '8912738178847'})
    @Prop({type: Types.ObjectId, ref: 'User'})
    owner: Types.ObjectId
}


export const favoriteSchema = SchemaFactory.createForClass(Favorite)