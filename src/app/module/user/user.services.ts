import jwt from "jsonwebtoken";
import config from "../../config";

// get/find user by id
const userGet = async (token: string) => {
  const accessKey = config.jwt_access_secret as string;
  const decoded = jwt.verify(token, accessKey);
  console.log({ decoded });
  return "result";
};

// get/find user by id
const userUpdated = async () => {
  return "result";
};

export const UserServices = {
  userGet,
  userUpdated,
};
