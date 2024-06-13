import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";
import auth from "../../middleware/auth";

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

router.post(
  "/change-password",
  auth("admin", "user"),
  validateRequest(AuthValidation.changePasswordSchema),
  AuthControllers.changePassword
);

export const AuthRouter = router;
