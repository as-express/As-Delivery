import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from '@nestjs/passport'
import { Model } from "mongoose";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { User } from "src/schemas/user/user.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService,@InjectModel(User.name) private User: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT')
        })
    }

    async validate({id}) {
        return await this.User.findById(id)
    }
}
