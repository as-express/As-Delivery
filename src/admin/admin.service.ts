import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/schemas/admin/admin.schema';
import { signDto } from './dto/sign.dto';
import { hash, verify } from 'argon2';


@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private Admin: Model<Admin>,
    private jwt: JwtService) {}


    async signup(data: signDto) {
        const isHave = await this.admin(data.username)
        if(isHave) {
            throw new BadRequestException('Admin is already exist')
        }

        const hashP = await hash(data.password)

        const admin = new this.Admin({username: data.username, password: hashP})
        await admin.save()

        const tokens = await this.issueTokens(admin.id)
        return {
            admin, tokens
        }
    }

    async signin(data: signDto) {
        const admin = await this.admin(data.username)
        if(!admin) {
            throw new NotAcceptableException('Admin is not defind')
        }

        const isPass = await verify(admin.password, data.password)
        if(!isPass) {
            throw new BadRequestException('Password is not correct')
        }

        return await this.issueTokens(admin.id)
    }


    private async admin(u: string) {
        const admin = await this.Admin.findOne({username: u})
        .select('-password')

        return admin
    }

    private async issueTokens(userId: string) {
        const data = {id: userId}

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '2d'
        })

        const accesToken = this.jwt.sign(data, {
            expiresIn: '24h'
        })

        return {
            refreshToken, accesToken
        }
    }
}
