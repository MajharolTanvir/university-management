import { Model, Schema, model } from 'mongoose'
import { UserTypes } from './users.interface'

type UserModel = Model<UserTypes, object>

const userSchema = new Schema<UserTypes>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      requires: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<UserTypes, UserModel>('user', userSchema)
