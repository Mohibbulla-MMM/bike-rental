import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserRole = "admin" | "user";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  passwordChangeAt?: Date;
  role: TUserRole;
}

export interface UserMehods extends Model<TUser> {
  // passwrd match  method
  isPasswordMatchMethod(
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean>;

  // password issued before passwrd change method
  isJWTIssuedBeforePasswordChangeMethod(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number
  ): boolean;

  // is user exists by mongodb _id by find
  isUserExistsByDBId(id: Types.ObjectId): Promise<TUser>;

  // new password hashed
  newPasswordHashed(plainTextPassword: string): Promise<string>;
}

export type TUser_Role = keyof typeof USER_ROLE;
