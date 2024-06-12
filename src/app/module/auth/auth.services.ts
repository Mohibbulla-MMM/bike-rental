import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  createUser,
};
