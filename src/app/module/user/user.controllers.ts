import { Request, Response } from "express";
import { UserServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const userGet = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user as JwtPayload;
  const result = await UserServices.userGet(userData);

  // const headers = req.headers;
  // console.log({ headers });

  sendResponse(res, {
    message: "User profile retrieved successfully",
    data: result,
  });
});

// user updated
const userUpdated = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user as JwtPayload;
  const payload = req?.body;
  // console.log({ payload });
  if (Object.keys(payload).length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "No data was found to update");
  }
  // payload: Omit<TUser,  "passwordChangeAt">
  const result = await UserServices.userUpdated(userData, payload);

  sendResponse(res, {
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserControllers = {
  userGet,
  userUpdated,
};
