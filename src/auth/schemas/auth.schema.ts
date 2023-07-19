import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema({timestamps: true})
export class Staff {
  @Prop()
  name: string;

  @Prop()
  staffId: string;

  @Prop()
  phoneNumber: number;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);