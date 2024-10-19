import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user/user.schema';
import { Basket, basketItems, basketSchema, itemSchema } from 'src/schemas/user/basket.schema';
import { YkassaService } from 'src/ykassa/ykassa.service';
import { Orders, orderSchema } from 'src/schemas/user/orders.schema';
import { Location,locationSchema } from 'src/schemas/user/lacation.schema';
import { Product, productSchema } from 'src/schemas/product/product.schema';
import { Promo, promocodeSchema } from 'src/schemas/admin/promocode.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: userSchema},
    {name: Basket.name, schema: basketSchema},
    {name: basketItems.name, schema: itemSchema},
    {name: Orders.name, schema: orderSchema},
    {name: Location.name, schema: locationSchema},
    {name: Product.name, schema: productSchema},
    {name: Promo.name, schema: promocodeSchema}
  ])],
  controllers: [BasketController],
  providers: [BasketService, YkassaService],
})

export class BasketModule {}
