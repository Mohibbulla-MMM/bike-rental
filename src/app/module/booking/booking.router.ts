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
  validateRequest(BookingValidataion.bookingSchema),
  BookingControllers.createBooking
);

//  your booking get (any login user)
router.get("/", auth("user", "admin"), BookingControllers.findAllBooking);

export const BookingRouter = router;
