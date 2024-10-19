import { Module } from '@nestjs/common';
import { EskizService } from './eskiz.service';
import { EskizController } from './eskiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp } from 'src/schemas/auth/otp.schema';
import { adminSchema } from 'src/schemas/admin/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Otp.name, schema: adminSchema}])],
  controllers: [EskizController],
  providers: [EskizService],
  exports: [EskizService]
})

export class EskizModule {}
