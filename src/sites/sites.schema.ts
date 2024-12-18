import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Site extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  hostingPlan: string;

  @Prop({ required: true })
  lastPaymentDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
