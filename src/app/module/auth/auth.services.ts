import config from "../../config";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TUserLogin, TtokenPayload } from "./auth.interface";
import { createToken } from "./auth.utils";

// create user
const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

// logged user
const loginUser = async (payload: TUserLogin) => {
  const { password, email } = payload;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  const hashPassword = user?.password;
  const isPasswordMathch = await User.isPasswordMatchMethod(
    password,
    hashPassword
  );
  //   console.log({ isPasswordMathch });
  if (!isPasswordMathch) {
    throw new Error("Wrong Password");
  }
  const tokenPayloadpayload: TtokenPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const token = createToken(
    tokenPayloadpayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  console.log({ token });
  return { token, data: user };
};

export const AuthService = {
  createUser,
  loginUser,
};
