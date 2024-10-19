import { Module } from '@nestjs/common';
import { LocationServie, UserService } from './user.service';
import { LocationController, UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user/user.schema';
import { FileModule } from 'src/file/file.module';
import { Favorite, favoriteSchema } from 'src/schemas/user/favorite.schema';
import { Basket, basketSchema } from 'src/schemas/user/basket.schema';
import { Location, locationSchema } from 'src/schemas/user/lacation.schema';
import { BasketModule } from './basket/basket.module';
import { Orders, orderSchema } from 'src/schemas/user/orders.schema';
import { OrderModule } from './order/order.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: userSchema},
    {name: Favorite.name, schema: favoriteSchema},
    {name: Basket.name, schema: basketSchema},
    {name: Location.name, schema: locationSchema},
    {name: Orders.name, schema: orderSchema}
  ]),
  FileModule,
  BasketModule,
  OrderModule,
  NoticeModule],
  controllers: [UserController, LocationController],
  providers: [UserService, LocationServie],
})

export class UserModule {}
