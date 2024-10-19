import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EskizModule } from './eskiz/eskiz.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { RestourantModule } from './restourant/restourant.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { YkassaModule } from './ykassa/ykassa.module';
import * as path from 'path'
import { BasketModule } from './user/basket/basket.module';
import { YkassaService } from './ykassa/ykassa.service';
import { OrderModule } from './user/order/order.module';
import { SearchModule } from './search/search.module';


@Module({
  imports: [MongooseModule.forRoot(''),
  ConfigModule.forRoot({isGlobal: true}),
  ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
  AuthModule,
  EskizModule,
  FileModule,
  UserModule,
  BasketModule,
  AdminModule,
  RestourantModule,
  ProductModule,
  ShopModule,
  YkassaModule,
  OrderModule,
  SearchModule
  // CacheModule.register({
  //     isGlobal: true,
  //     store: redisStore,
  //     socket: {
  //       host: '',
  //       port: 6379
  //     }
  //   })
  ],
  controllers: [AppController],
  providers: [AppService, YkassaService],
})


export class AppModule {}
