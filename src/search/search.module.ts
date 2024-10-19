import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from 'src/schemas/product/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: productSchema}])],
  controllers: [SearchController],
  providers: [SearchService],
})

export class SearchModule {}
