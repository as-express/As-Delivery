import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Menu } from "./menu.schema";
import { User } from "../user/user.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Reviews {
    @ApiProperty({example: 5})
    @Prop({default: 0})
    stars: number
    
    @ApiProperty({example: 'good sushied'})
    @Prop()
    text: string
    
    @ApiProperty({example: 9284939982})
    @Prop({type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}})
    user: User
}


@Schema()
export class Restourant {
    @ApiProperty({example: 'Sushi-cafe'})
    @Prop({unique: true})
    title: string

    @ApiProperty({example: 'sushi.png'})
    @Prop()
    picture: string

    @ApiProperty({example: 0})
    @Prop({default: 1})
    stars: number

    @ApiProperty({example: 0})
    @Prop({default: 0})
    orders: number

    @ApiProperty({example: 'this is sushi city'})
    @Prop()
    description: string

    @ApiProperty({example: 'Sushi-cafe'})
    @Prop({enum: ["Bad", "Middle", "Good", "Very Good"], default: 'Middle'})
    ratingStatus: string

    @Prop({default: 0})
    reviewsCount: number

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}]})
    reviews: Reviews[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]})
    allMenu: Menu[]
}


export const restourantSchema = SchemaFactory.createForClass(Restourant)
export const reviewSchema = SchemaFactory.createForClass(Reviews)
