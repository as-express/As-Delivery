import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user/user.schema';
import { passwordDto } from './dto/password.dt';
import { hash, verify } from 'argon2';
import { FileService, Type } from 'src/file/file.service';
import { Favorite } from 'src/schemas/user/favorite.schema';
import { Basket } from 'src/schemas/user/basket.schema';
import { locationDto } from './dto/location.dto';
import { Location } from 'src/schemas/user/lacation.schema';
import { Orders } from 'src/schemas/user/orders.schema';
import { fileDto } from './dto/avatar.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private User: Model<User>,
    @InjectModel(Favorite.name) private Favorite: Model<Favorite>,
    @InjectModel(Basket.name) private Basket: Model<Basket>,
    @InjectModel(Orders.name) private Orders: Model<Orders>,
    @InjectModel(Location.name) private Location: Model<Location>,
    private fileS: FileService) {}


    async getProfile(id: string) {
        const user = await this.User.findById(id)
        .select('-password')

        const location = await this.Location.find({user: id})
        .select('-user')
        return {
            user, location
        }
    }

    async changeAvatar(id: string, ava: fileDto) {
        const user = await this.checkUser(id)

        const isD = user.avatar === 'static.png'
        if(!isD) {
            const rm = await this.fileS.removeFile(Type.AVATAR, user.avatar)
            const nAva = await this.fileS.writeFile(Type.AVATAR, ava)

            user.avatar = nAva
            await user.save()

            return await this.checkUser(id)
        }

        const nAva = await this.fileS.writeFile(Type.AVATAR, ava)
        user.avatar = nAva

        user.save()
        return await this.checkUser(id)
    }

    async changePass(id: string, data: passwordDto) {
        const user = await this.checkUser(id)
        
        const isPass = await verify(data.oldPassword, user.password)
        if(!isPass) {
            throw new BadRequestException('Password is not correct')
        }

        const hashP = await hash(data.newPassword)
        user.password = hashP

        await user.save()
        return await this.checkUser(id)
    }

    async getFavorite(id: string) {
        await this.checkUser(id)
        const fv = await this.Favorite.findOne({owner: id})
        .populate('products')
        .select('-owner -id')
        if(!fv) {
            throw new NotFoundException('Favorite is not defind')
        }

        return fv
    }

    async getBasket(id: string) {
        await this.checkUser(id)

        const basket = await this.Basket.findOne({owner: id})
        return basket
    }
    


    private async checkUser(id: string) {
        const user = await this.User.findById(id)
        if(!user) {
            throw new NotFoundException('User is not defind')
        }

        return user
    }
}


@Injectable()
export class LocationServie {
    constructor(@InjectModel(User.name) private User: Model<User>,
    @InjectModel(Location.name) private Location: Model<Location>) {}


    async addLocation(id: string, data: locationDto) {
        console.log(id)
        await this.checkSquare(data.lat, data.long)

        const location = new this.Location({title: data.title, long: data.long, lat: data.lat, user: id})
        await location.save()

        return location
    }

    async getLocation(id: string) {
        const locations = await this.Location.find({user: id})
        return locations
    }

    async editLocation(user: string, id: string, data: locationDto) {
        await this.cehckUser(user)
        const location = await this.Location.findByIdAndUpdate(id, {
            $set: data
        }, {new: true})

        if(!location || location.user.toString() !== user) {
            throw new BadRequestException('Location is not defind')
        }

        await location.save()
        return location
    }

    async deleteLocation(id: string, location: string) {
        await this.cehckUser(id)

        const loc = await this.Location.findByIdAndDelete(id)
        if(!loc) {
            throw new BadRequestException('Location is not defind')
        }

        return 'Location is deleted'
    }


    private async cehckUser(id: string) {
        const user = await this.User.findById(id)
        if(!user) {
            throw new BadRequestException('User is not defind')
        }

        return user
    }



    private async checkSquare(lat: number, long: number) {
        const maxLat = 41.397600
        const maxLong = 69.378900
        const minLat = 41.226662
        const minLong = 69.145896

        if(lat >= minLat && lat <= maxLat) {
            if(long >= minLong && long <= maxLong) {
                console.log('Success')
            }
        } else 
        {
            throw new BadRequestException('Sorry, We work only in Tashkent')
        }

        console.log('Success')
    }
}
