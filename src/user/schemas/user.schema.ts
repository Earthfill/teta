import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Duplicate email entered or email already exists'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  picture: string;

  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  walletId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: false })
  ninVerified: boolean;

  @Prop({ default: false })
  nin: string;

  @Prop()
  smileUserId: string;

  @Prop()
  isVerifying: boolean;

  @Prop()
  verificationMessage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
