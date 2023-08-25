import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AgentDocument = HydratedDocument<Agent>;

@Schema({ timestamps: true })
export class Agent {
  @Prop()
  operatorId: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop({ default: false })
  isSuspend: boolean;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
