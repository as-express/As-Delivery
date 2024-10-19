import { Injectable, Res } from '@nestjs/common';
import * as fs from 'fs'

@Injectable()
export class AppService {

  async getHello() {
    const imageBuffer = fs.readFileSync('./payed.png')
    return { data: imageBuffer, contentType: 'image/png' }
  }
}
