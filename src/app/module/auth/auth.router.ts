import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidation.userSchema),
  AuthControllers.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  AuthControllers.loginUser
);

export const AuthRouter = router;
