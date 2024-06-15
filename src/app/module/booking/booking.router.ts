import { Router } from "express";
import auth from "../../middleware/auth";
import { BookingControllers } from "./booking.controllers";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidataion } from "./bookin.validation";

const router = Router();

//  bookie create (any login user)
router.post(
  "/",
  auth("user", "admin"),
  // validateRequest(BookingValidataion.bookingSchema),
  BookingControllers.createRentals
);

router.put("/:id/return", auth("admin"), BookingControllers.updateReurnBike);

//  your booking get (any login user)
router.get("/", auth("user", "admin"), BookingControllers.findAllRentals);

export const BookingRouter = router;
