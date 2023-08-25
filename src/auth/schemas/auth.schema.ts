import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema({ timestamps: true })
export class Staff {
  @Prop({ unique: true })
  name: string;

  @Prop()
  staffId: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  role: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({})
  refreshToken: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
