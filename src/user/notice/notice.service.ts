import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, Notice } from 'src/schemas/user/notice.schema';

@Injectable()
export class NoticeService {
    constructor(@InjectModel(Notice.name) private Notice: Model<Notice>,
    @InjectModel(Message.name) private Message: Model<Message>) {}

    async takeNotice(id: string) {
        const notice = await this.checkNotice(id)
        return notice
    }

    async rmMessage(user: string, id: string) {
        const notice = await this.checkNotice(user)

        const msg = await this.Message.findByIdAndDelete(id)
        if(!msg) {
            throw new NotFoundException('Message is not found')
        }
        
        const index = notice.messages.indexOf(msg.id)
        notice.messages.splice(index, 1)
        notice.count -= 1

        await notice.save()
        return 'Message is removed from notice'
    }

    async clearAll(id: string) {
        const notice = await this.checkNotice(id)

        notice.messages = []
        notice.count = 0
        await notice.save()

        return notice
    }


    private async checkNotice(id: string) {
        const notice = await this.Notice.findOne({owner: id})
        .populate('messages').select('-owner')
        if(!notice) {
            throw new BadRequestException('Notice is not defind')
        }

        return notice
    }

    private async checkMessage(id: string) {
        const msg = await this.Message.findById(id)
        if(!msg) {
            throw new NotFoundException('Message is not found')
        }

        return msg
    }
}
