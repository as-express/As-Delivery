import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fake } from 'src/schemas/auth/fake.schema';
import { Otp } from 'src/schemas/auth/otp.schema';
import { User } from 'src/schemas/user/user.schema';
import { signupDto } from './dto/signup.dto';
import { hash, verify } from 'argon2';
import { EskizService } from 'src/eskiz/eskiz.service';
import { otpDto } from './dto/otp.dto';
import { JwtService } from '@nestjs/jwt';
import { siginDto } from './dto/signin.dto';
import { validateDto } from './dto/validate.dto';
import { Favorite } from 'src/schemas/user/favorite.schema';
import { Basket } from 'src/schemas/user/basket.schema';
import { Notice } from 'src/schemas/user/notice.schema';
import { phoneDto } from './dto/phone.dto';


@Injectable()
export class AuthService {
    constructor(@InjectModel(Otp.name) private Otp: Model<Otp>,
    @InjectModel(Fake.name) private Fake: Model<Fake>,
    @InjectModel(User.name) private User: Model<User>,
    @InjectModel(Favorite.name) private Favorite: Model<Favorite>,
    @InjectModel(Basket.name) private Basket: Model<Basket>,
    @InjectModel(Notice.name) private Notice: Model<Notice>,
    private eskiz: EskizService, private jwt: JwtService,
    ) {}


    async signup(data: signupDto) {
        const exist = await this.isHave(data.username, data.phone)
        if(exist) {
            throw new BadRequestException('User is already exist please change your username or phone')
        }
        
        const hashP = await hash(data.password)
        const user = new this.User({username: data.username, phone: data.phone, password: hashP})

        await user.save()

        const favorite = new this.Favorite({owner: user.id})
        await favorite.save()

        // Basket
        const basket = new this.Basket({owner: user.id})
        await basket.save()

        const notice = new this.Notice({owner: user.id})
        await notice.save()

        // await this.eskiz.sendSMS(data.phone)
        return 'Go though Otp'
    }

    async ss(data: signupDto) {
        const hashP = await hash(data.password)
        const user = new this.User({username: data.username, phone: data.phone, password: hashP})

        await user.save()
        return user
    }

    async otp(data: otpDto) {
        const otp = await this.Otp.findOne({phone: data.phone})
        if(!otp) {
            throw new NotFoundException('Otp is not found please go though signup')
        }

        const isCode = data.code === otp.code
        if(!isCode) {
            throw new BadRequestException('Code is not correct')
        }

        await this.Otp.findByIdAndDelete(otp.id)
        return await this.saveUser(data.phone)
    }

    async signin(data: siginDto) {
        const user = await this.chechUser(data.phone)
        if(!user) {
            throw new BadRequestException('User is not authorized')
        }

        const isPass = await verify(user.password, data.password)
        if(!isPass) {
            throw new BadRequestException('Password is not correct')
        }

        return this.issueToken(user.id)
    }

    async rePassword(phone: phoneDto) {
        await this.chechUser(phone.phone)
        await this.eskiz.sendSMS(phone.phone)

        return 'Go though validate'
    }

    async validatePass(data: validateDto) {
        const user = await this.chechUser(data.phone)
        const eskiz = await this.Otp.findOne({phone: data.phone})
        if(!eskiz) {
            throw new BadRequestException('The code time is end')
        }

        const isCode = data.code === eskiz.code
        if(!isCode) {
            throw new BadRequestException('Code is not correct')
        }

        const hashP = await hash(data.password)
        user.password = hashP

        await user.save()
        return 'Password is changed'
    }



    private async isHave(u: string, p: string) {
        const user = await this.User.findOne({$or: [
            {username: u},
            {phone: p}
        ]})

        return user
    }

    private async chechUser(phone: string) {
        const user = await this.User.findOne({phone: phone})
        if(!user) {
            throw new BadRequestException('User is not defind')
        }

        return user
    }

    private async saveUser(phone: string) {
        const fake = await this.Fake.findOne({phone})
        
        const user = new this.User({username: fake.username, phone: fake.phone, password: fake.password})
        await user.save()

        const favorite = new this.Favorite({owner: user.id})
        await favorite.save()

        // Basket
        const basket = new this.Basket({owner: user.id})
        await basket.save()

        const notice = new this.Notice({owner: user.id})
        await notice.save()

        await this.Fake.findByIdAndDelete(fake.id)
        return await this.issueToken(user.id)
    }

    private async issueToken(userId: string) {
        const data = {id: userId}

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '3d'
        })

        const accesToken = this.jwt.sign(data, {
            expiresIn: '1d'
        })


        return {
            refreshToken, accesToken
        }
    }

    async destroyUser(username: string) {
        const user = await this.User.findOne({username: username})
        await this.User.findByIdAndDelete(user.id)
    }
}

