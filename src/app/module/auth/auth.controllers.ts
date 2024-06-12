import { Request, Response } from "express";
import { AuthService } from "./auth.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// user signup/create
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body);

  sendResponse(res, {
    message: "User created success full",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
};
