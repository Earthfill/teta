import { Injectable } from '@nestjs/common';
import * as https from 'https';

@Injectable()
export class PaystackService {
  async getBankData(): Promise<any> {
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/bank?currency=NGN',
      method: 'GET',
      headers: {
        Authorization: 'Bearer SECRET_KEY',
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }
}
