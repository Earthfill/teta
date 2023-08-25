import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OperatorDocument = HydratedDocument<Operator>;

@Schema({ timestamps: true })
export class Operator {
  @Prop({ unique: true })
  firstName: string;

  @Prop({ unique: true })
  lastName: string;

  @Prop()
  address: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  bankName: string;

  @Prop({ unique: true })
  accountNumber: string;

  @Prop({ unique: true })
  bvn: string;

  @Prop({ unique: true })
  nin: string;

  @Prop({ default: false })
  isSuspend: boolean;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
