import { FundsTransferProps } from './types';

export interface IPaystackInitiateTransferResponse {
  amount: number;
  currency: 'NGN';
  reason: string;
  status: 'otp' | 'completed';
  transfer_code: string;
  createdAt: string;
}

//@TODO: do the appropriate types here
export interface IPaystackTransactionResponse {
  id: 2009945086;
  domain: 'test';
  status: 'success' | 'failed' | 'pending';
  reference: 'rd0bz6z2wu';
  amount: 20000;
  message: null;
  gateway_response: 'Successful';
  paid_at: '2022-08-09T14:21:32.000Z';
  created_at: '2022-08-09T14:20:57.000Z';
  channel: 'card';
  currency: 'NGN';

  fees: 100; // AMOUNTS ARE IN KOBO

  customer: {
    id: 89929267;
    first_name: null;
    last_name: null;
    email: 'hello@email.com';
    customer_code: 'CUS_i5yosncbl8h2kvc';
    phone: null;
    metadata: null;
    risk_action: 'default';
    international_format_phone: null;
  };
  paidAt: '2022-08-09T14:21:32.000Z';
  createdAt: '2022-08-09T14:20:57.000Z';
}

export interface IPaystackReceipientResponse {
  recipient_code: string;
}

export type InitiateTransferData = {
  transferCode: string;
};

export interface InitiateTransferResponse {
  completed: boolean;
  data: InitiateTransferData | null;
}

export type GetRecipientData = {
  recipientCode: string;
};
export type GetTransactionData = {
  amount: number;
  paidAt: string;
  status: string;
};

export interface GetRecipientResponse {
  completed: boolean;
  data: GetRecipientData | null;
}

export interface GetTransactionResponse {
  completed: boolean;
  data: GetTransactionData | null;
}

export type FundsTransferData = {
  status: 'pending' | 'failed';
};

export interface FundsTransferResponse {
  completed: boolean;
  data: FundsTransferData;
}

export interface IPaymentProvider {
  fundsTransfer(props: FundsTransferProps): Promise<FundsTransferResponse>;
  getTransaction(referenceCode: string): Promise<GetTransactionResponse>;
}

// S O L I D
