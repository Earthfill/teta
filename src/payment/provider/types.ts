export type InitiateTransferProps = {
  amount: number;
  reason: string;
  recipient: string;
};

export type GetRecipientProps = {
  accountNumber: string;
  bankCode: string;
  name: string;
};

export type FundsTransferProps = {
  accountNumber: string;
  amount: number;
  bankCode: string;
  name: string;
  reason?: string;
};
