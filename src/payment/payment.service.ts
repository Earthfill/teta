import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { PAYMENT_PROVIDER_TOKEN, IPaymentProvider } from './provider';
import { TransferFundsProps } from './types';

// Controller Service Provider Repository

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_PROVIDER_TOKEN)
    private readonly paymentProvider: IPaymentProvider,
  ) {}

  async transferFunds(props: TransferFundsProps) {
    const response = await this.paymentProvider.fundsTransfer({
      amount: props.amount,
      reason: props.reason,
      accountNumber: props.accountNumber,
      name: props.name,
      bankCode: props.bankCode,
    });

    if (response.completed) {
      // send email that funds is on its way
    } else {
      // notify admins
    }
    return response;
  }

  async verifyTransfer(reference: string) {
    return this.paymentProvider.getTransaction(reference);
  }
}
