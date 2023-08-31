import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  transferFunds(params: any, secretKey: string): Observable<any> {
    const options: AxiosRequestConfig = {
      url: 'https://api.paystack.co/transfer',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      data: params,
    };

    return this.httpService.request(options);
  }

  getTransferData(secretKey: string): Observable<any> {
    const options: AxiosRequestConfig = {
      url: 'https://api.paystack.co/transfer',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    };

    return this.httpService.request(options);
  }

  finalizeTransfer(params: any, secretKey: string): Observable<any> {
    const options: AxiosRequestConfig = {
      url: 'https://api.paystack.co/transfer/finalize_transfer',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      data: params,
    };

    return this.httpService.request(options);
  }

  transferBulk(params: any, secretKey: string): Observable<any> {
    const options: AxiosRequestConfig = {
      url: 'https://api.paystack.co/transfer/bulk',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      data: params,
    };

    return this.httpService.request(options);
  }

  verifyTransfer(reference: string, secretKey: string): Observable<any> {
    const options: AxiosRequestConfig = {
      url: `https://api.paystack.co/transfer/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    };

    return this.httpService.request(options);
  }

  createRecipient(params: any, secretKey: string): Observable<any> {
    const options: AxiosRequestConfig = {
      url: 'https://api.paystack.co/transferrecipient',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      data: params,
    };

    return this.httpService.request(options);
  }
}
