import { Types } from "mongoose";
import { TUserRole } from "../user/user.interface";

export type TUserLogin = {
  email: string;
  password: string;
};

export type TtokenPayload = {
  _id: Types.ObjectId;
  email: string;
  role: TUserRole;
};
