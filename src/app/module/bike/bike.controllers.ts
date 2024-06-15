import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { TBike } from "./bike.interface";
import { BikeServices } from "./bike.services";

// create bike (admin)
const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeInToDB(req.body);

  sendResponse(res, {
    message: "Bike added successfully",
    data: result,
  });
});

// get/find all bike (all user)
const findAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.findAllBikeInToDB();

  sendResponse(res, {
    message: "Bikes retrieved successfully",
    data: result,
  });
});

// updated bike (admin)
const updatedBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  if (Object.keys(payload)?.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST,"Updated Value empty");
  }
  const result = await BikeServices.updatedBikeFromDB(id, payload);
  sendResponse(res, {
    message: "Bike updated successfully",
    data: result,
  });
});

// delete bike (admin)
const deletedBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deletedBikeInToDB(id);

  sendResponse(res, {
    message: "Bike deleted successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  findAllBike,
  updatedBike,
  deletedBike,
};
