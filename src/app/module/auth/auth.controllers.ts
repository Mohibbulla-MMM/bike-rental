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

// user login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    message: "User login successfull",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
