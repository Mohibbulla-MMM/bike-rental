import { MongoExpiredSessionError } from "mongodb";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

// create bike (admin)
const createBikeInToDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

// get/find all bike (all user)
const findAllBikeInToDB = async () => {
  const result = await Bike.find();
  if (result?.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

// updated bike (admin)
const updatedBikeFromDB = async (id: string, payload: TBike) => {
  const bike = await Bike.findById(id);
  if (!bike) {
    throw new AppError(httpStatus.BAD_REQUEST, "Bike id is not valid");
  }

  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// delete bike (admin)
const deletedBikeInToDB = async (id: string) => {
  const bike = await Bike.findById(id);
  if (!bike) {
    throw new AppError(httpStatus.BAD_REQUEST, "Bike id is not valid");
  }

  const result = await Bike.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true }
  );

  return result;
};

export const BikeServices = {
  createBikeInToDB,
  findAllBikeInToDB,
  updatedBikeFromDB,
  deletedBikeInToDB,
};
