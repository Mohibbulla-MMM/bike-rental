import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TUserLogin } from "./auth.interface";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUserLogin) => {
  const { password, email } = payload;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }
  console.log({user})
  return user;
};

export const AuthService = {
  createUser,
  loginUser,
};
