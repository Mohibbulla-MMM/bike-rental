import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../user/user.validation";

const router = Router();

router.post("/signup",
validateRequest(userValidation.userSchema)
,AuthControllers.createUser);

export const AuthRouter = router;
