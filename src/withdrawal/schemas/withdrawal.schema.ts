import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WithdrawalDocument = HydratedDocument<Withdrawal>;

@Schema({ timestamps: true })
export class Withdrawal {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  userId: string;

  @Prop({ nin: 0, default: 0 })
  amount: number;

  @Prop()
  accountName: string;

  @Prop()
  bank: string;

  @Prop({ default: 'pending' })
  status: string;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);
