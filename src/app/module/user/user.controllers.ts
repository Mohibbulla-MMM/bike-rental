import { Request, Response } from "express";
import { UserServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const userGet = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.userGet();

  sendResponse(res, {
    message: "User get success !",
    data: result,
  });
  
});

export const UserControllers = {
  userGet,
};
