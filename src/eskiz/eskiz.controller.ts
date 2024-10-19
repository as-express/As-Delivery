import { Body, Controller, Post } from '@nestjs/common';
import { EskizService } from './eskiz.service';

@Controller('eskiz')
export class EskizController {
  constructor(private readonly eskizService: EskizService) {}

  @Post('send')
  async sendSMS(@Body() phoneNumber: string) {
    return this.eskizService.sendSMS(phoneNumber)
  }
}
