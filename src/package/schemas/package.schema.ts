import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PackageTrackingStatus } from '../interfaces';

export type PackageDocument = HydratedDocument<Package>;

@Schema({ timestamps: true })
export class Package {
  @Prop({ min: new Date() })
  packageDate: Date;

  @Prop()
  packageId: string;

  @Prop()
  packageWeight: number;

  @Prop()
  packageType: string;

  @Prop()
  travellerId: string;

  @Prop()
  senderId: string;

  @Prop()
  collectorPhone: string;

  @Prop()
  collectorEmail: string;

  @Prop()
  collectorName: string;

  @Prop({ default: false })
  paymentStatus: boolean;

  @Prop({
    type: Object,
    default: {
      dropped: false,
      droppedTime: '',
      delivered: false,
      deliveryTime: '',
    },
  })
  packageStatus: PackageTrackingStatus;

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
