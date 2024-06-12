import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router = Router();

//  user get
router.get("/me", UserControllers.userGet);

export const UserRouter = router;
