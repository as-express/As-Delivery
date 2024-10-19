import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService, Type } from 'src/file/file.service';
import { Product } from 'src/schemas/product/product.schema';
import { productDto } from './dto/procduct.dto';
import { Catalog } from 'src/schemas/shop/catalog.schema';
import { Menu} from 'src/schemas/restourant/menu.schema';
import { descriptionDto } from './dto/description.dto';
import { Description } from 'src/schemas/product/description.schema';
import { User } from 'src/schemas/user/user.schema';
import { Favorite } from 'src/schemas/user/favorite.schema';
import { Basket, basketItems } from 'src/schemas/user/basket.schema';
import { basketDto } from './dto/basket.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private Product: Model<Product>,
    private file: FileService,
    @InjectModel(Menu.name) private Menu: Model<Menu>,
    @InjectModel(Catalog.name) private Catalog: Model<Catalog>,
    @InjectModel(Description.name) private Description: Model<Description>,
    @InjectModel(User.name) private User: Model<User>,
    @InjectModel(Favorite.name) private Favorite: Model<Favorite>,
    @InjectModel(Basket.name) private Basket: Model<Basket>,
    @InjectModel(basketItems.name) private basketItems: Model<basketItems>,
    ) {}

    
    async newProduct(id: string, data: productDto, file: any) {
        await this.isHave(data.title)

        const ctlg = await this.Catalog.findById(id).populate('products')
        const menu = await this.Menu.findById(id).populate('foods')

        if(ctlg) {
            const write = await this.file.writeFile(Type.IMAGE, file)
            const product = new this.Product({title: data.title, picture: write, price: data.price, weight: data.weight, catalogId: ctlg.id}) 

            ctlg.productsCount += 1
            ctlg.products.push(product.id)

            await product.save()
            await ctlg.save()


            return this.returnFields(product)            
        }
        if(menu) {
            const write = await this.file.writeFile(Type.IMAGE, file)
            const product = new this.Product({title: data.title, picture: write, price: data.price, weight: data.weight, menuId: menu.id}) 
            
            menu.foodsCount += 1
            menu.foods.push(product.id)
            
            await product.save()
            await menu.save()

            return this.returnFields(product)
        }
        
        throw new BadRequestException('The menuId or catalogId is not defind')
    }

    async addDescription(id: string, data: descriptionDto) {
        const prd = await this.checkProduct(id)

        const desc = new this.Description({text: data.text, productId: id})
        await desc.save()

        prd.description = desc.id
        await prd.save()

        const rtr = await this.Product.findById(id)
        .populate('description')

        return rtr
    }

    async addToFavorite(id: string, prdId: string) {
        const product = await this.checkProduct(prdId)
        await this.checkUser(id)

        const favorite = await this.Favorite.findOne({owner: id})
        .populate('products')
        if(!favorite) {
            throw new BadRequestException('Favorite is not defind')
        }

        const isHave = favorite.products.some(prId => prId.title === product.title)
        if(isHave) {
            const index = favorite.products.indexOf(product.id)
            favorite.products.splice(index, 1)
            favorite.count -= 1

            await favorite.save()
            return product
        }

        favorite.count += 1
        favorite.products.push(product.id)

        await favorite.save()
        return product
    }



    async addToBasket(id: string, prdId: string, data: basketDto) {
        const product = await this.checkProduct(prdId)
        await this.checkUser(id)

        const basket = await this.Basket.findOne({owner: id})
        .populate('items')
        if(!basket) {
            throw new NotFoundException('Basket is not defind')
        }

        
        let count = data.count
        let i = 1
        let price = product.price
        let incement = product.price

        while(i < count) {
            price += incement
            i ++
        }

        console.log(product)
        
        const item = new this.basketItems
        ({product: product.id, count: data.count, price: price, basket: basket.id})

        
        await item.save()
        console.log(item)
        
        
        const re = await this.basketItems.findById(item.id).populate('product')

        basket.items.push(item.id)
        await basket.save()
        

        return re
    }

    async getProducts(query: number) {
        const page =  query || 1

        const count = 9
        const skip = (page -1) * count 

        const prds = await this.Product.find().skip(skip).limit(count)
        .select('-menuId -catalogId')

        return prds
    }


    async getProduct(id: string) {
        const rtr = await this.Product.findById(id)
        .populate({path: 'description', select: '-productId'})
        .select('-catalogId -menuId')

        return rtr
    }


    
    private async checkUser(id: string) {
        const user = this.User.findById(id)
        if(!user) {
            throw new BadRequestException('User is not defind')
        }

        return user
    }

    private async isHave(title: string) {
        const prd = await this.Product.findOne({title})
        if(prd) {
            throw new BadRequestException('The P5roduct is already exist') 
        }

        return prd
    }

    private async checkProduct(id: string) {
        const prd = await this.Product.findById(id)
        if(!prd) {
            throw new NotFoundException('Product is not defind')
        }

        return prd
    }

    private returnFields(prd: any) {
        return {
            id: prd.id,
            title: prd.title,
            picture: prd.picture,
            price: prd.price,
            weight: prd.weight
        }
    }
}
