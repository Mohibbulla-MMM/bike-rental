import { Request, Response } from "express";
import { AuthService } from "./auth.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.createUser(req.body);
    res.status(200).json({
      status: true,
      message: "User created success full",
      data: result,
    });
    result;
  } catch (err) {
    console.log(err);
  }
};

export const AuthControllers = {
  createUser,
};
