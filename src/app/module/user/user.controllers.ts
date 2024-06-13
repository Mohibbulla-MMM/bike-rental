import { Request, Response } from "express";
import { UserServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const userGet = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.userGet(req.headers.authorization as string);

  // const headers = req.headers;
  // console.log({ headers });

  sendResponse(res, {
    message: "User logged in successfully",
    data: result,
  });
});

export const UserControllers = {
  userGet,
};
