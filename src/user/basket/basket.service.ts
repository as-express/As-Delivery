import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Basket, basketItems } from 'src/schemas/user/basket.schema';
import { Orders } from 'src/schemas/user/orders.schema';
import { User } from 'src/schemas/user/user.schema';
import { YkassaService } from 'src/ykassa/ykassa.service';
import { orderDto } from './dto/order.dto';
import { Location } from 'src/schemas/user/lacation.schema';
import { Product } from 'src/schemas/product/product.schema';
import { Promo } from 'src/schemas/admin/promocode.schema';
import { promocodeDto } from './dto/promo.dto';


@Injectable()
export class BasketService {
    constructor(@InjectModel(User.name) private User: Model<User>,
    @InjectModel(Basket.name) private Basket: Model<Basket>,
    @InjectModel(basketItems.name) private Item: Model<basketItems>,
    @InjectModel(Orders.name) private Order: Model<Orders>,
    @InjectModel(Location.name) private Adres: Model<Location>,
    @InjectModel(Product.name) private Product: Model<Product>,
    @InjectModel(Promo.name) private Promo: Model<Promo>,
    private ykassa: YkassaService) {}


    async getBasket(id: string) {
        await this.checkUser(id)
        
        const basket = await this.Basket.findOne({owner: id})
        .populate('items')
        .select('-owner')
        if(!basket) {
            throw new BadRequestException('Basket is not defind')
        }

        const prices = basket.items.map(it => it.price)
        const total$ = prices.reduce((a, b) => a + b, 0)

        basket.totalPrice = Number(total$)
        await basket.save()

    
        return basket
    }

    async rmProduct(user: string, id: string) {
        await this.checkUser(user)
        const item = await this.checkItem(id)

        const basket = await this.Basket.findOne({owner: user})
        .populate('items').select('-owner')
        if(!basket) {
            throw new BadRequestException('Basket is not defind')
        }

        const isHave = basket.items.some(it => it.product._id === item.product._id)
        if(!isHave) {
            throw new BadRequestException('Item is not defind')
        }

        const index = basket.items.indexOf(item.id)
        basket.items.splice(index, 1)

        await basket.save()
        await this.Item.findByIdAndDelete(id)

        return basket
    }


    async payment(id: string, promocode?: promocodeDto) {
        const user = await this.checkUser(id)
        const num = this.randomNum()

        const basket = await this.Basket.findOne({owner: id})
        .populate('items')
        .select('-owner')
        if(!basket) {
            throw new BadRequestException('Basket is not defind')
        }

        const takeT = basket.items.map(it => it.product)

        const productsPromises = takeT.map(productId => this.Product.findById(productId));
        const products = await Promise.all(productsPromises);

        const validProducts = products.filter(product => product !== null)
        const names = validProducts.map(dd => dd.title)
        const etc = 'Was Ordered The Products Are '
        const as = etc + names.reduce((a, b) => a+b)
        

        const order = new this.Order({no: num, description: as, owner: id})
        await order.save()

        if(promocode) {
            const promo = await this.promoLimit(promocode.promocode)
            const cash = Number(promo.cash)

            const price = basket.totalPrice - cash
            await this.clearBasket(user.id)

            await this.promoLimit(promocode.promocode)

            return await this.ykassa.makePayment(price)
        } else
        {
        const price = basket.totalPrice
        await this.clearBasket(user.id)

        await basket.save()

        return await this.ykassa.makePayment(price)
        }
    }


    async clearBasket(id: string) {
        const basket = await this.checkBasket(id)

        basket.items = []
        basket.totalPrice = 0

        await basket.save()
        return basket
    }



    private async checkUser(id: string) {
        const user = await this.User.findById(id)
        if(!user) {
            throw new BadRequestException('User is not defind')
        }

        return user
    }

    private async checkItem(id: string) {
        const item = await this.Item.findById(id)
        .populate('product')
        if(!item) {
            throw new NotFoundException('Item is not defind')
        }

        return item
    }

    private async checkBasket(id: string) {
        const basket = await this.Basket.findOne({owner: id})
        .populate('items')
        .select('-owner')
        if(!basket) {
            throw new BadRequestException('Basket is not defind')
        }

        return basket
    }

    private async checkAdress(id: string) {
        const adr = await this.Adres.findOne({user: id})
        return adr
    }


    private randomNum() {
        let num = ''
        for (let i = 0; i < 12; i++) {
            num += Math.floor(Math.random() * 10)
        }

        return num
    }

    private async promoLimit(code: string) {
        const promo = await this.Promo.findOne({code: code})
        if(!promo) {
            throw new NotFoundException('Promocode is not found')
        }

        const limit = promo.limit
        const used = promo.used
        if(limit === used) {
            throw new BadRequestException('Promocode limit is ended')
        }

        promo.used += 1
        await promo.save()

        return promo
    } 
}
