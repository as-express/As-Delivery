import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from 'src/schemas/auth/otp.schema';


@Injectable()
export class EskizService {
  private email: string
  private password: string
  
  constructor(
    @InjectModel(Otp.name) private readonly otpModel: Model<Otp>,
  ) {this.email = 'miko.mikoo1999@gmail.com', this.password = 'miyrkazak1'}



  private async authenticate(email: string, password: string) {
    try {
      const res = await fetch('https://my.eskiz.uz/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!res.ok) {
        throw new Error(`Authentication failed. Status: ${res.status}, Message: ${await res.text()}`);
      }

      const data = await res.json()
      return data;
    } catch (error) {
      throw new Error(`Error during authentication: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async sendSMS(phoneNumber: string) {
    try {
      const {email, password} = this

      const authenticationData = await this.authenticate(email, password);
      const token = authenticationData.access_token;
      const num = Math.floor(1000 + Math.random() * 9000);

      const url = await fetch('https://my.eskiz.uz/api/send-sms/single', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: 6171,
          count: 1,
          nik_id: '4546',
          phone: phoneNumber,
          sending: 'server1',
          text: `Code ${num}`,
        }),
      });

      if (!url.ok) {
        throw new Error(`SMS sending failed. Status: ${url.status}, Message: ${await url.text()}`);
      }

      const isNum = num.toString();
      const eskiz = new this.otpModel({ phone: phoneNumber, code: isNum });
      await eskiz.save();

      const datas = await url.json();
      console.log(datas);
    } catch (error) {
      throw new Error(`Error during SMS sending: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}


// throw new Error(`Error during SMS sending: ${error instanceof Error ? error.message : 'Unknown error'}`);