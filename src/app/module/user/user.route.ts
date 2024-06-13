import { Router } from "express";
import { UserControllers } from "./user.controllers";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

//  user get
router.get("/me", auth("user", "admin"), UserControllers.userGet);

// update profile
router.put(
  "/me",
  auth("user", "admin"),
  validateRequest(userValidation.userUpdatedSchema),
  UserControllers.userUpdated
);

export const UserRouter = router;
