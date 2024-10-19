import { Module } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { PromocodeController } from './promocode.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promo, promocodeSchema } from 'src/schemas/admin/promocode.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Promo.name, schema: promocodeSchema}])],
  controllers: [PromocodeController],
  providers: [PromocodeService],
})
export class PromocodeModule {}
