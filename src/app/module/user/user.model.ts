import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { UserRole } from "./user.constant";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 4,
    maxlength: 20,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 20,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  role: { type: String, enum: UserRole, required: true },
});

export const User = model<TUser>("User", userSchema);
