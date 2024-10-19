import { Module } from '@nestjs/common';
import { YkassaService } from './ykassa.service';
import { YkassaController } from './ykassa.controller';

@Module({
  controllers: [YkassaController],
  providers: [YkassaService],
  exports: [YkassaService]
})

export class YkassaModule {}
