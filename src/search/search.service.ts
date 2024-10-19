import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product/product.schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class SearchService {
    constructor(@InjectModel(Product.name) private Product: Model<Product>) {}


    async search(title: string) {
        const prds = await this.Product.find({ title: { $regex: new RegExp(title, 'i') } })
        if(!prds) {
            throw new NotFoundException('Product is not found')
        }

        return prds
    }
}
