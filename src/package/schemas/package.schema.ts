import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TrackingStatus } from '../interfaces';

@Schema({ timestamps: true })
export class Package extends Document {
  @Prop()
  packageWeight: number;

  @Prop()
  packageType: string;

  @Prop()
  travellerId: mongoose.Schema.Types.ObjectId;

  @Prop()
  senderId: mongoose.Schema.Types.ObjectId;

  @Prop()
  collectorPhone: string;

  @Prop()
  collectorEmail: string;

  @Prop()
  collectorName: string;

  @Prop({ default: false })
  paymentStatus: boolean;

  @Prop({ type: Object, default: { dropped: false, delivered: false } })
  trackingStatus: TrackingStatus;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  picture: string;

  @Prop()
  packageDescription: string;

  @Prop({ type: Object, default: { packageValue: 0, premium: 0 } })
  insurance: { packageValue: number; premium: number };

  @Prop()
  distance: number;
  @Prop()
  travelTime: string;
  @Prop()
  verified: boolean;
  @Prop()
  isVerifying: boolean;
  @Prop()
  smileUserId: string;
  @Prop()
  verificationMessage: string;
  @Prop()
  insuranceConsumerId: string;
  @Prop()
  insuranceTransactionRef: string;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
