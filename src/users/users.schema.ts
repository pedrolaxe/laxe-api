import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definindo um Enum para as Roles
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator', // Exemplo de outra role
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ type: [String], enum: Role, default: [Role.USER] })
  roles: Role[];

  @Prop({ required: false })
  phoneNumber?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
