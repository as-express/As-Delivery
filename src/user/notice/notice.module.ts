import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, Notice, messageSchema, noticeSchema } from 'src/schemas/user/notice.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Notice.name, schema: noticeSchema},
    {name: Message.name, schema: messageSchema}
  ])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
