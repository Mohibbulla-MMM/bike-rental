import httpStatus from "http-status";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../module/user/user.interface";
import { User } from "../module/user/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...requiredRolles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization;
    const secretKye = config.jwt_access_secret as string;

    if (!token) {
      // AppError(httpStatus.UNAUTHORIZED, "You are not Authorized! -- Token ");
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not Authorized! -- Token "
      );
    }

    const decoded = jwt.verify(token, secretKye) as JwtPayload;
    const { _id, role, iat } = decoded;

    const user = await User.isUserExistsByDBId(_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (requiredRolles && !requiredRolles.includes(user?.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    if (requiredRolles && !requiredRolles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    const passwordChangeAt = user?.passwordChangeAt;
    if (passwordChangeAt) {
      const result = User.isJWTIssuedBeforePasswordChangeMethod(
        passwordChangeAt,
        iat as number
      );
      // console.log({ result });
      if (result) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not Authorized! (invalid token)"
        );
      }
    }

    // console.log(requiredRolles && !requiredRolles.includes(user?.role));
    // console.log(requiredRolles);
    req.user = decoded;
    next();
  });
};

export default auth;
