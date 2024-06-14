import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.services";

// create rentals (any login user)
const createRentals = catchAsync(async (req, res) => {
  const result = await BookingServices.createRentalsInToDB(req.user, req.body);

  sendResponse(res, {
    message: "Rental created successfully",
    data: result,
  });
});

// update Reurn Bike time and price
const updateReurnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const result = await BookingServices.updateReurnBikeFromDB(id);

  sendResponse(res, {
    message: "Bike returned successfully",
    data: result,
  });
});

// find all booking by user id (login user)
const findAllRentals = catchAsync(async (req, res) => {
  const result = await BookingServices.findAllRentalsInToDB(req.user);

  sendResponse(res, {
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createRentals,
  findAllRentals,
  updateReurnBike,
};
