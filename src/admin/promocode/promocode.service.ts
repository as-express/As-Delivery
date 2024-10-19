import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promo } from 'src/schemas/admin/promocode.schema';
import { promoDto } from './dto/promo.dto';

@Injectable()
export class PromocodeService {
    constructor(@InjectModel(Promo.name) private Promo: Model<Promo>) {}


    async newPromo(data: promoDto) {
        const isHave = await this.Promo.findOne({code: data.code})
        if(isHave) {
            throw new BadRequestException('The Promocode is already exist')
        }

        const promo = new this.Promo({code: data.code, cash: data.cash, limit: data.limit})
        await promo.save()

        return promo
    }


    async getPromos() {
        const promos = await this.Promo.find()
        return promos
    }

    async rmPromo(id: string) {
        const checkPromo = await this.Promo.findById(id)
        if(!checkPromo) {
            throw new NotFoundException('Promocode is not defind')
        }

        const rm = await this.Promo.findByIdAndDelete(id)
        return 'Promocode is deleted'
    }
}
