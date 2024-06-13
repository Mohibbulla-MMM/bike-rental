import jwt, { JwtPayload } from "jsonwebtoken";
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

  // console.log({ token });
  return { token, data: user };
};

// change password
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  console.log({ userData }, { payload });

  const { _id, role, iat } = userData;

  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found !");
  }

  const passwordChangeAt = user?.passwordChangeAt;
  if (passwordChangeAt) {
    const result = User.isJWTIssuedBeforePasswordChangeMethod(
      passwordChangeAt,
      iat as number
    );
    // console.log({ result });
    if (result) {
      throw new Error("You are not Authorized! invalid token");
    }
  }

  // password match
  const passwordMatch = await User.isPasswordMatchMethod(
    payload?.oldPassword,
    user?.password
  );
  console.log({ passwordMatch });

  return null;
};

export const AuthService = {
  createUser,
  loginUser,
  changePassword,
};
