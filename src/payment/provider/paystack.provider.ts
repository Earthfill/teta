import { Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  FundsTransferData,
  FundsTransferResponse,
  GetRecipientData,
  GetRecipientResponse,
  GetTransactionData,
  GetTransactionResponse,
  IPaymentProvider,
  IPaystackInitiateTransferResponse,
  IPaystackReceipientResponse,
  IPaystackTransactionResponse,
  InitiateTransferData,
  InitiateTransferResponse,
} from './interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  FundsTransferProps,
  GetRecipientProps,
  InitiateTransferProps,
} from './types';

export class PaystackProvider implements IPaymentProvider {
  private readonly baseURL = 'https://api.paystack.co';
  private readonly logger = new Logger(PaystackProvider.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  private async makeAuthenticatedRequest<T>(
    payload: AxiosRequestConfig,
  ): Promise<T | null> {
    let response = null as T | null;

    const token = this.configService.get('PAYSTACK_SECRET');

    try {
      const apiResponse: AxiosResponse<T> = await this.httpService.axiosRef<T>({
        ...payload,
        headers: {
          ['Authorization']: `Bearer ${token}`,
          ['Content-Type']: 'application/json',
        },
        baseURL: this.baseURL,
      });

      response = apiResponse.data;
    } catch (error: any) {
      this.logger.error(
        `makeAuthenticatedRequest: ${JSON.stringify(error, null, 2)}`,
      );
    }

    return response;
  }

  private async initiateTransfer(
    props: InitiateTransferProps,
  ): Promise<InitiateTransferResponse> {
    const initiateTransferResponse = {
      completed: false,
      data: null as InitiateTransferData | null,
    };

    const response =
      await this.makeAuthenticatedRequest<IPaystackInitiateTransferResponse>({
        method: 'POST',
        url: 'transfer',
        data: {
          source: 'balance',
          reason: props.reason,
          amount: props.amount,
          recipient: props.recipient,
        },
      });

    if (response) {
      initiateTransferResponse.completed = true;
      initiateTransferResponse.data = {
        transferCode: response.transfer_code,
      };
    }

    return initiateTransferResponse;
  }
  private async getRecipient(
    props: GetRecipientProps,
  ): Promise<GetRecipientResponse> {
    const getRecipientData = {
      completed: false,
      data: null as GetRecipientData | null,
    };

    const response =
      await this.makeAuthenticatedRequest<IPaystackReceipientResponse>({
        method: 'POST',
        url: '/transferrecipient',
        data: {
          type: 'nuban',
          name: props.name,
          account_number: props.accountNumber,
          bank_code: props.bankCode,
          currency: 'NGN',
        },
      });

    if (response) {
      getRecipientData.completed = true;
      getRecipientData.data = {
        recipientCode: response.recipient_code,
      };
    }

    return getRecipientData;
  }

  async fundsTransfer(
    props: FundsTransferProps,
  ): Promise<FundsTransferResponse> {
    const fundsTransfer = {
      completed: false,
      data: { status: 'failed' } as FundsTransferData,
    };

    const recipientData = await this.getRecipient({
      accountNumber: props.accountNumber,
      name: props.name,
      bankCode: props.bankCode,
    });

    if (recipientData.completed) {
      const transferResponse = await this.initiateTransfer({
        amount: props.amount,
        reason: props.reason ?? '',
        recipient: recipientData.data.recipientCode,
      });

      if (transferResponse.completed) {
        fundsTransfer.completed = true;
        fundsTransfer.data.status = 'pending';
      }
    }

    return fundsTransfer;
  }

  async getTransaction(referenceCode: string): Promise<GetTransactionResponse> {
    const getTransactionResponse = {
      completed: false,
      data: null as GetTransactionData | null,
    };

    const response =
      await this.makeAuthenticatedRequest<IPaystackTransactionResponse>({
        method: 'GET',
        url: `/transfer/verify/${referenceCode}`,
      });

    if (response) {
      getTransactionResponse.completed = true;
      getTransactionResponse.data = {
        amount: response.amount,
        status: response.status,
        paidAt: response.paid_at,
      };
    }

    return getTransactionResponse;
  }
}
