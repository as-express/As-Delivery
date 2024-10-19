import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, adminSchema } from 'src/schemas/admin/admin.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { PromocodeModule } from './promocode/promocode.module';
import { CanceledModule } from './canceled/canceled.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    MongooseModule.forFeature([{name: Admin.name, schema: adminSchema}]),
    PromocodeModule,
    CanceledModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})

export class AdminModule {}
