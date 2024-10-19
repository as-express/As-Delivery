import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from 'src/schemas/shop/shop.schema';
import { shopDto } from './dto/shop.dto';
import { FileService, Type } from 'src/file/file.service';
import { Catalog } from 'src/schemas/shop/catalog.schema';
import { catalogDto } from './dto/catalog.dto';


@Injectable()
export class ShopService {
    constructor(@InjectModel(Shop.name) private Shop: Model<Shop>, private file: FileService) {}


    async newShop(data: shopDto, picture: any) {
        const isExite = await this.Shop.findOne({title: data.title})
        if(isExite) {
            throw new BadRequestException('Shop is already exite')
        }

        const writeFile = await this.file.writeFile(Type.IMAGE, picture)
        const shop = new this.Shop({title: data.title, picture: writeFile, description: data.description})

        await shop.save()
        return this.returnFields(shop)
    }

    async getShops(query: number) {
        const page =  query || 1

        const count = 9
        const skip = (page -1) * count 

        const shops = await this.Shop.find().skip(skip).limit(count)
        return shops
    }

    async getShopById(id: string) {
        const shop = await this.Shop.findById(id)
        .populate({path: 'catalogs', select: '-products -shopId'})
        if(!shop) {
            throw new NotFoundException('The Shop is not found')
        }

        return shop
    }



    private async getById(id: string) {
        const shop = await this.Shop.findById(id)
        if(!shop) {
            throw new BadRequestException('Shop is not found')
        }

        return shop
    }

    private returnFields(rf: any) {
        return {
            id: rf.id,
            title: rf.title,
            picture: rf.picture,
            description: rf.description,
        }
    }
}



@Injectable()
export class CatalogService {
    constructor(@InjectModel(Shop.name) private Shop: Model<Shop>,
    @InjectModel(Catalog.name) private Catalog: Model<Catalog>, 
    private file: FileService) {}


    async addCatalog(id: string, data: catalogDto, icon: any) {
        const isExist = await this.Catalog.findOne({title: data.title})
        if(isExist) {
            throw new NotFoundException('Catalog is not found')
        }

        const writeFile = await this.file.writeFile(Type.IMAGE, icon)
        const catalog = new this.Catalog({title: data.title, icon: writeFile, shopId: id})

        const shop = await this.Shop.findById(id)
        shop.catalogs.push(catalog.id)

        await shop.save()

        await catalog.save()
        return this.returnFields(catalog)
    }

    async getCatalogs() {
        const catalogs = await this.Catalog.find()
        .select('-products -shopId')
        // return this.returnFields(catalogs)
        return catalogs
    }

    async getCatalog(id: string) {
        const catalog = await this.Catalog.findById(id)
        .populate({path: 'products', select: '-catalogId'})
        .select('-shopId')
        if(!catalog) {
            throw new NotFoundException('Catalog is not found')
        }

        return catalog
    }


    
    private async getById(id: string) {
        const catalog = await this.Catalog.findById(id)
        if(!catalog) {
            throw new NotFoundException('Catalog is not found')
        }

        return catalog
    }

    private returnFields(ct: any) {
        return {
            id: ct.id,
            title: ct.title,
            icon: ct.icon,
            productsCount: ct.productsCount
        }
    }
}
