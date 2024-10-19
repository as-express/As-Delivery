import { Module } from '@nestjs/common';
import { CatalogService, ShopService } from './shop.service';
import { CatalogController, ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, shopSchema } from 'src/schemas/shop/shop.schema';
import { Catalog, catalogSchema } from 'src/schemas/shop/catalog.schema';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Shop.name, schema: shopSchema},
  {name: Catalog.name, schema: catalogSchema}]), FileModule],
  controllers: [ShopController, CatalogController],
  providers: [ShopService, CatalogService],
})


export class ShopModule {}
