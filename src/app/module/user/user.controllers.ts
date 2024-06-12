import { Request, Response } from "express";
import { UserServices } from "./user.services";

const userGet = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.userGet();
    res.status(200).json({
      status: true,
      message: "User get success !",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  userGet,
};
