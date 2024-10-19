import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, orderSchema } from 'src/schemas/user/orders.schema';
import { Canceled, canceledSchema } from 'src/schemas/canceled.schema';
import { User, userSchema } from 'src/schemas/user/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Orders.name, schema: orderSchema},
    {name: Canceled.name, schema: canceledSchema},
    {name: User.name, schema: userSchema}
  ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})

export class OrderModule {}
