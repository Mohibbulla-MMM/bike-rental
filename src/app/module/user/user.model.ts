import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { UserRole } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

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
    select: 0,
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

// password hash
userSchema.pre("save", async function () {
  const user = this;
  const salt = Number(config.bcrypt_salt_round);
  user.password = await bcrypt.hash(user.password, salt);
});

// password empty before send
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
// password deleted before send
userSchema.set("toJSON", {
  transform(doc, ret, options) {
    delete ret.password;
    return ret;
  },
});
// password deleted before send
userSchema.set("toObject", {
  transform(doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

export const User = model<TUser>("User", userSchema);
