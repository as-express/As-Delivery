import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user/user.schema';
import { Otp, otpSchema } from 'src/schemas/auth/otp.schema';
import { Fake, fakeSchema } from 'src/schemas/auth/fake.schema';
import { EskizModule } from 'src/eskiz/eskiz.module';
import { FileModule } from 'src/file/file.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy'
import { getJwtConfig } from 'src/config/jwt.config'
import { Favorite, favoriteSchema } from 'src/schemas/user/favorite.schema';
import { Admin, adminSchema } from 'src/schemas/admin/admin.schema';
import { Basket, basketSchema } from 'src/schemas/user/basket.schema';
import { Notice, noticeSchema } from 'src/schemas/user/notice.schema';



@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    EskizModule,
    FileModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Otp.name, schema: otpSchema },
      { name: Fake.name, schema: fakeSchema },
      { name: Favorite.name, schema: favoriteSchema },
      {name: Admin.name, schema: adminSchema},
      {name: Basket.name, schema: basketSchema},
      {name: Notice.name, schema: noticeSchema}
    ])
  ],
  exports: [AuthService]
})

export class AuthModule {}
