import { Router } from "express";
import { UserControllers } from "./user.controllers";
import auth from "../../middleware/auth";

const router = Router();

//  user get
router.get("/me", auth("user", "admin"), UserControllers.userGet);

export const UserRouter = router;
