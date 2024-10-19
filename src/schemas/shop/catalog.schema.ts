import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Product } from "../product/product.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Catalog {
    @ApiProperty({example: 'Молочные продукты'})
    @Prop({unique: true})
    title: string

    @ApiProperty({example: 'milk.png'})
    @Prop()
    icon: string

    @ApiProperty({example: 0})
    @Prop({default: 0})
    productsCount: number

    @ApiProperty({example: []})
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]})
    products: Product[]

    @Prop({type: Types.ObjectId, ref: 'Shop'})
    shopId: Types.ObjectId
}

export const catalogSchema = SchemaFactory.createForClass(Catalog)