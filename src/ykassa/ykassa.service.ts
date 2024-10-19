import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class YkassaService {
    async makePayment(cash: number) {
    const {data} = await axios({
      method: 'POST',
      url: 'https://api.yookassa.ru/v3/payments',
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Date.now()
      },
      auth: {
        username: '', // Your Y Kasss ShopId
        password: '' //  Your Y Kasss Paymenr Token 
      },
      data: {
        "amount": {
          "value": cash,
          "currency": "RUB"
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: 'http://localhost:3000/api/as/payed'
        },
        // description: `Order ${order}`
      }
    })


    return data
  }
}
