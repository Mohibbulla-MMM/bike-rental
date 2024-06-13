import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "./user.model";
import { TUser } from "./user.interface";

// get/find user by id
const userGet = async (userData: JwtPayload) => {
  const { _id, email } = userData;
  const result = await User.findOne({ _id, email });
  if (!result) {
    throw new Error("User not found");
  }
  // console.log()
  return result;
};

// get/find user by id
const userUpdated = async (userData: JwtPayload, payload: Partial<TUser>) => {
  
  return;
};

export const UserServices = {
  userGet,
  userUpdated,
};
