import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";



@Schema()
export class Description {
    @Prop()
    text: string

    @Prop({type: Types.ObjectId, ref: 'Product', required: true})
    productId: Types.ObjectId
}

export const descriptionSchema = SchemaFactory.createForClass(Description)