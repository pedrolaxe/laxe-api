import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Settings extends Document {
  @Prop({ required: false })
  companyName?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  domain?: string;

  @Prop({ default: false })
  isMaintenanceMode: boolean;

  @Prop({ required: false })
  logoUrl?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
