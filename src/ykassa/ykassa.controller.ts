import { Controller } from '@nestjs/common';
import { YkassaService } from './ykassa.service';

@Controller('ykassa')
export class YkassaController {
  constructor(private readonly ykassaService: YkassaService) {}
}
