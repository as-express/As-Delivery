import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileModule } from 'src/file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from 'src/schemas/product/product.schema';
import { Menu, menuSchema } from 'src/schemas/restourant/menu.schema';
import { Catalog, catalogSchema } from 'src/schemas/shop/catalog.schema';
import { Description, descriptionSchema } from 'src/schemas/product/description.schema';
import { User, userSchema } from 'src/schemas/user/user.schema';
import { Favorite, favoriteSchema } from 'src/schemas/user/favorite.schema';
import { Basket, basketItems, basketSchema, itemSchema } from 'src/schemas/user/basket.schema';

@Module({
  imports: [FileModule, MongooseModule.forFeature([{name: Product.name, schema: productSchema},
    {name: Menu.name, schema: menuSchema}, {name: Catalog.name, schema: catalogSchema},
    {name: Description.name, schema: descriptionSchema},
    {name: User.name, schema: userSchema},
    {name: Favorite.name, schema: favoriteSchema},
    {name: Basket.name, schema: basketSchema},
    {name: basketItems.name, schema: itemSchema}
  ])],
  controllers: [ProductController],
  providers: [ProductService],
})

export class ProductModule {}
