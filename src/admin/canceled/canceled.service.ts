import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Canceled } from 'src/schemas/canceled.schema';
import { Orders } from 'src/schemas/user/orders.schema';
import { User } from 'src/schemas/user/user.schema';
import { refuseDto } from './dto/refuse.dto';
import { Message, Notice } from 'src/schemas/user/notice.schema';

@Injectable()
export class CanceledService {
    constructor(@InjectModel(Canceled.name) private Cance: Model<Canceled>,
    @InjectModel(Orders.name) private Order: Model<Orders>,
    @InjectModel(User.name) private User: Model<User>,
    @InjectModel(Notice.name) private Notice: Model<Notice>,
    @InjectModel(Message.name) private Message: Model<Message>) {}


    async allCanceles() {
        const cances = await this.Cance.find()
        return cances
    }

    async takeReview(no: string) {
        
        const cance = await this.Cance.findOne({no: no})
        const isOrder = await this.Order.findOne({no: no})
        const user = await this.User.findById(cance.owner)
        .select('-password')
        
        const notice = await this.getNotice(cance.owner.toString())
        const msg = new this.Message({text: `Canceled Order no ${cance.no} in Review`})
        await msg.save()

        notice.messages.push(msg.id)
        notice.count += 1
        notice.save()

        cance.status = 'Cheking'
        await cance.save()

        return {
            cance, isOrder, user
        }
    }

    async getApprove(no: string) {
        const cance = await this.checkCance(no)

        cance.status = 'Approved'
        await cance.save()

        const notice = await this.getNotice(cance.owner.toString())
        const msg = new this.Message({text: `Canceled Order no ${cance.no} is Approved`})
        await msg.save()
        
        notice.messages.push(msg.id)
        notice.count += 1
        notice.save()

        return 'Cance is Approved'
    }


    async getRefuse(no: string, data: refuseDto) {
        const cance = await this.checkCance(no)

        cance.status = 'Refused'
        cance.refusedReason = data.refusedReason
        await cance.save()

        const notice = await this.getNotice(cance.owner.toString())
        const msg = new this.Message({text: `Canceled Order no ${cance.no} is Refused Because` + data.refusedReason})
        await msg.save()
        
        notice.messages.push(msg.id)
        notice.count += 1
        notice.save()

        return 'Cance is Refused'
    }



    private async checkCance(no: string) {
        const cance = await this.Cance.findOne({no: no})
        if(!cance) {
            throw new BadRequestException('Cance is not defind')
        }

        return cance
    }

    private async getNotice(id: string) {
        const notice = await this.Notice.findOne({owner: id})
        if(!notice) {
            throw new BadRequestException('Notice is not defind')
        }

        return notice
    }

}
