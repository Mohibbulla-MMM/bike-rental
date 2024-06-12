import { Types } from "mongoose";
import { TUserRole } from "../user/user.interface";

export type TUserLogin = {
  email: string;
  password: string;
};

export type TtokenPayload = {
  email: string;
  password: string;
  _id: Types.ObjectId;
  role: TUserRole;
};
