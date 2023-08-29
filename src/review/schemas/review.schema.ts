import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop()
  rating: number;

  @Prop()
  reviewee: mongoose.Schema.Types.ObjectId;

  @Prop()
  review: string;

  @Prop()
  reviewer: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
