import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "./user.schema";
import { ApiProperty } from "@nestjs/swagger";



@Schema()
export class Location {
    @ApiProperty({example: 'Moscow'})
    @Prop()
    title: string

    @ApiProperty({example: '43.341341'})
    @Prop()
    lat: number

    @ApiProperty({example: '64.234547'})
    @Prop()
    long: number

    @ApiProperty({example: '397491827489'})
    @Prop({type: Types.ObjectId, ref: 'User'})
    user: Types.ObjectId
}

export const locationSchema = SchemaFactory.createForClass(Location)