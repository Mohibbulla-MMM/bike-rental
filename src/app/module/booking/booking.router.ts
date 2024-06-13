import { Router } from "express";
import auth from "../../middleware/auth";
import { BookingControllers } from "./booking.controllers";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidataion } from "./bookin.validation";

const router = Router();

//  user get
router.post(
  "/",
  auth("user", "admin"),
  validateRequest(BookingValidataion.bookingSchema),
  BookingControllers.createBooking
);

export const BookingRouter = router;
