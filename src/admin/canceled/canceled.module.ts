import { Module } from '@nestjs/common';
import { CanceledService } from './canceled.service';
import { CanceledController } from './canceled.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, orderSchema } from 'src/schemas/user/orders.schema';
import { Canceled, canceledSchema } from 'src/schemas/canceled.schema';
import { User, userSchema } from 'src/schemas/user/user.schema';
import { Message, Notice, messageSchema, noticeSchema } from 'src/schemas/user/notice.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Orders.name, schema: orderSchema},
    {name: Canceled.name, schema: canceledSchema},
    {name: User.name, schema: userSchema},
    {name: Notice.name, schema: noticeSchema},
    {name: Message.name, schema: messageSchema}
  ])],
  controllers: [CanceledController],
  providers: [CanceledService],
})
export class CanceledModule {}
