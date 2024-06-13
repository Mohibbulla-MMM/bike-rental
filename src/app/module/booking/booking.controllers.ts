import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.services";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingInToDB(req.user, req.body);

  sendResponse(res, {
    message: "Rental created successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
};
