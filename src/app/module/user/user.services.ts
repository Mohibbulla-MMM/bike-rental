import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// get/find user by id
const userGet = async (userData: JwtPayload) => {
  const { _id, email } = userData;
  const result = await User.findOne({ _id, email });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // console.log()
  return result;
};

// get/find user by id
const userUpdated = async (userData: JwtPayload, payload: Partial<TUser>) => {
  // payload: Omit<TUser,  "passwordChangeAt">
  const { _id, email } = userData;

  delete payload?.password;
  delete payload?.passwordChangeAt;

  console.log("after", { payload });

  const result = await User.findOne({ _id, email });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const userUpdated = await User.findOneAndUpdate({ _id, email }, payload, {
    new: true,
  });
  return userUpdated;
};

export const UserServices = {
  userGet,
  userUpdated,
};
