import { Schema, model } from 'mongoose';
import { UserModel, UserTypes } from './user.interface';

const userSchema = new Schema<UserTypes>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserTypes, UserModel>('user', userSchema);