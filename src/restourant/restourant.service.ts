import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restourant, Reviews } from 'src/schemas/restourant/restaurant.schema';
import { restourantDto } from './dto/restourant.dto';
import { FileService, Type } from 'src/file/file.service';
import { Menu } from 'src/schemas/restourant/menu.schema';
import { menuDto } from './dto/menu.dto';
import { User } from 'src/schemas/user/user.schema';
import { reviewDto } from './dto/review.dto';
import { title } from 'process';


@Injectable()
export class RestourantService {
    constructor(@InjectModel(Restourant.name) private Restourant: Model<Restourant>,
    @InjectModel(User.name) private User: Model<User>,
    @InjectModel(Reviews.name) private Review: Model<Reviews>,
    private file: FileService) {}


    async newRestourant(data: restourantDto, picture: any) {
        const isR = await this.checkRestourant(data.title)
        if(isR) {
            throw new BadRequestException('Restourant is already created')
        }

        const writedFile  = await this.file.writeFile(Type.IMAGE, picture)
        const newRes = new this.Restourant({title: data.title, description: data.description, picture: writedFile})

        await newRes.save()
        return newRes
    }


    async allRestourants(query: number) {
        const page =  query || 1

        const count = 9
        const skip = (page -1) * count 

        const rss = await this.Restourant.find()
        .select('-allMenu')
        .skip(skip).limit(count).sort({title: 'asc'})

        return rss
    }


    async getRestourant(id: string) {
        const rs = await this.Restourant.findById(id)
        .populate({path: 'allMenu', select: '-restourantId -foods'})
        if(!rs) {
            throw new NotFoundException('Restourant is not found')
        }

        return rs
    }

    async putReview(id: string, resId: string, data: reviewDto) {
        await this.User.findById(id)

        const restourant = await this.Restourant.findById(resId)
        .populate('reviews')
        if(!restourant) {
            throw new NotFoundException('Restourant is not found')
        }

        const isPuted = restourant.reviews.some(rev => rev.user.toString() === id)
        if(!isPuted) {
            throw new BadRequestException('You can not put the review twice')
        }

        const review = new this.Review({stars: data.stars, text: data.text, user: id})
        await review.save()


        restourant.reviewsCount += 1
        restourant.reviews.push(review.id)

        restourant.stars = review.stars
        
        let status
        const rating = restourant.stars
        if(rating >= 5) {
            status = 'Very Good'
        } else if(rating >= 4 && rating < 5) {
            status = 'Good'
        } else if(rating < 4 && rating >= 3.5) {
            status = 'Middle'
        } else {
            status = 'Bad'
        }

        restourant.ratingStatus = status
        await restourant.save()
        
        return restourant
    }



    private async checkRestourant(name: string) {
        const res = await this.Restourant.findOne({title: name})
        return res
    }

    private async checkUser(id: string) {
        const user = await this.User.findById(id)
        if(!user) {
            throw new BadRequestException('User is not defind')
        }

        return user
    }

    private returnFields(rs: any) {
        return {
            id: rs.id,
            title: rs.title,
            picture: rs.picture,
            rating: rs.rating,
            ratingStatus: rs.ratingStatus,
            orders: rs.orders
        }
    }
}



@Injectable()
export class MenuService {
    constructor(@InjectModel(Menu.name) private Menu: Model<Menu>,
    @InjectModel(Restourant.name) private Restourant: Model<Restourant>,) {}


    async addMenu(data: menuDto, id: string) {
        const rs = await this.chechRs(id)
        const isA = await this.chechMenu(data.title)
        if(isA) {
            throw new BadRequestException('Menu is alreay created')
        }

        const menu = new this.Menu({title: data.title, restourantId: id})
        rs.allMenu.push(menu.id)

        await menu.save()
        await rs.save()

        return this.returnFields(menu)
    }

    async getAllMenu() {
        const menues = await this.Menu.find()
        .select('-foods -restourantId')

        return menues
    }

    async getMenu(id: string) {
        const menu = await this.Menu.findById(id)
        .populate({path: 'foods', select: '-menuId -description'})
        .select('-id -restourantId')
        
        return menu
    }



    private async chechMenu(name: string) {
        const menu = await this.Menu.findOne({title: name})
        return menu
    }

    private async findById(id: string) {
        const menu = await this.Menu.findById(id)
        if(!menu) {
            throw new NotFoundException('Menu is not found')
        }

        return menu
    }

    private async chechRs(id: string) {
        const rs = await this.Restourant.findById(id)
        if(!rs) {
            throw new NotFoundException('Restourant is not found')
        }

        return rs
    }

    private returnFields(menu: any) {
        return {
            id: menu.id,
            title: menu.title,
            foodsCount: menu.foodsCount
        }
    }
}
