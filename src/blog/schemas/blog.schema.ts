import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  article: string;

  @Prop()
  authorName: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
