import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Product } from "../product/product.schema";
import { ApiProperty } from "@nestjs/swagger";


@Schema()
export class basketItems {
    //  @Prop({type: {type: Types.ObjectId, ref: 'Product'}})
    //  food: Types.ObjectId
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product: mongoose.Types.ObjectId
    // @Prop({ type: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}})
    // product: Product

    @Prop({ default: 0 })
    count: number

    @Prop({ default: 0 })
    price: number

    @Prop({ type: Types.ObjectId, ref: 'Basket' })
    basket: Types.ObjectId
}

export const itemSchema = SchemaFactory.createForClass(basketItems)

@Schema()
export class Basket {
    @ApiProperty({example: []})
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'basketItems' }] })
    items: basketItems[]

    @ApiProperty({example: 7000})
    @Prop({ default: 0 })
    totalPrice: number
    
    @Prop({ type: Types.ObjectId, ref: 'User' })
    owner: Types.ObjectId
}

export const basketSchema = SchemaFactory.createForClass(Basket)