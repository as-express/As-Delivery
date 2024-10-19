import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Catalog } from "./catalog.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Shop {
    @ApiProperty({example: 'Петеречка'})
    @Prop({unique: true})
    title: string

    @ApiProperty({example: 'peterechka.png'})
    @Prop()
    picture: string

    @ApiProperty({example: 'Продукт маркер'})
    @Prop()
    description: string

    @ApiProperty({example: []})
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Catalog'}]})
    catalogs: Catalog[]
}


export const shopSchema = SchemaFactory.createForClass(Shop)