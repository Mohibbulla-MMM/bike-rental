import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { UserRole } from "./user.constant";

const userSchema = new Schema<TUser>({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  phone: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true },
  role: { type: String, enum: UserRole, required: true },
});

export const User = model<TUser>("User", userSchema);
