import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TravellerTrackingStatus } from '../interfaces';

export type TravellerDocument = HydratedDocument<Traveller>;

@Schema({ timestamps: true })
export class Traveller {
  @Prop({ min: new Date() })
  travelDate: Date;

  @Prop()
  travellerId: string;

  @Prop()
  packageId: string;

  @Prop({ min: 0 })
  availableWeight: number;

  @Prop()
  travellerDestination: string;

  @Prop()
  travellerOrigin: string;

  @Prop()
  ticketNumber: string;

  @Prop()
  flightNumber: string;

  @Prop()
  pickupLocation: string;

  @Prop()
  travellerFee: number;

  @Prop({
    type: Object,
    default: {
      delayed: false,
      inTransit: false,
      arrived: false,
      inTransitTime: '',
      arrivedTime: '',
    },
  })
  trackingStatus: TravellerTrackingStatus;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: false })
  cancelled: boolean;

  @Prop()
  verified: boolean;

  @Prop()
  isVerifying: boolean;

  @Prop()
  smileUserId: string;

  @Prop()
  verificationMessage: string;
}

export const TravellerSchema = SchemaFactory.createForClass(Traveller);
