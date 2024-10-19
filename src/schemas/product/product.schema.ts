import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Description } from "./description.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Product {
    @ApiProperty({example: 'Молоко'})
    @Prop({unique: true})
    title: string

    @ApiProperty({example: 'milk.png'})
    @Prop()
    picture: string

    @ApiProperty({example: 70})
    @Prop()
    weight: number

    @ApiProperty({example: 500})
    @Prop()
    price: number

    @ApiProperty({example: 'Молоко 1л из крупного тц'})
    @Prop({type: {type: mongoose.Schema.Types.ObjectId, ref: 'Description'}})
    description: Description

    @Prop({type: Types.ObjectId, ref: 'Menu'})
    menuId: Types.ObjectId

    @Prop({type: Types.ObjectId, ref: 'Catalog'})
    catalogId: Types.ObjectId
}

export const productSchema = SchemaFactory.createForClass(Product)
