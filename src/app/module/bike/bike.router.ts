import { Router } from "express";
import auth from "../../middleware/auth";
import { BikeControllers } from "./bike.controllers";
import validateRequest from "../../middleware/validateRequest";
import { BikeValidation } from "./bike.validation";

const router = Router();

//  bike create (only admin)
router.post(
  "/",
  auth("admin"),
  validateRequest(BikeValidation.bikeSchema),
  BikeControllers.createBike
);

//  bike all get  (any user)
router.get("/", BikeControllers.findAllBike);

//  bike updated  (only admin)
router.put("/:id", auth("admin"), BikeControllers.updatedBike);

export const BikeRouter = router;
