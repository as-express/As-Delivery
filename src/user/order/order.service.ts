import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Canceled } from 'src/schemas/canceled.schema';
import { Orders } from 'src/schemas/user/orders.schema';
import { canceDto } from './dto/cance.dto';
import { User } from 'src/schemas/user/user.schema';


@Injectable()
export class OrderService {
    constructor(@InjectModel(Orders.name) private Order: Model<Orders>,
    @InjectModel(Canceled.name) private Cance: Model<Canceled>,
    @InjectModel(User.name) private User: Model<User>) {}

    async getOrders(id: string) {
        const orders = this.Order.find({owner: id})
        return orders
    }

    async takeOrder(id: string, no: string) {        
        const currentOrder = await this.Order.findOne({no: no})
        const isHave = currentOrder.owner.toString() === id

        if(!isHave) {
            throw new BadRequestException('Order is not defind')
        }

        currentOrder.status = 'Delivered'
        await currentOrder.save()

        return 'Thank you for bought'
    }


    async canceOrder(id: string, no: string, data: canceDto) {
        const user = await this.takeUser(id)
        const currentOrder = await this.Order.findOne({no: no})
        const isHave = currentOrder.owner.toString() === id

        if(!isHave) {
            throw new BadRequestException('Order is not defind')
        }

        currentOrder.status = 'Canceled'
        await currentOrder.save()

        const canceled = new this.Cance({no: currentOrder.no, reason: data.reason,
        card: data.card, username: user.username, owner: user.id})

        await canceled.save()

        return `The Order no ${currentOrder.no}is canceled and Cash will returned over 48h`
    }


    private async takeUser(id: string) {
        const user = await this.User.findById(id)
        if(!user) {
            throw new BadRequestException('User is not defind')
        }

        return user
    }

}
