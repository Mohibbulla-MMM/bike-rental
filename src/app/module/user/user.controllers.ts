import { Request, Response } from "express";
import { UserServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

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
  const payload = req.body;
  if (!payload) {
    throw new Error("No data was found to update");
  }
  const result = await UserServices.userUpdated(userData, req.body);

  sendResponse(res, {
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserControllers = {
  userGet,
  userUpdated,
};
