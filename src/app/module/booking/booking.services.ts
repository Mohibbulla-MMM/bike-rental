import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { TBookingPayload } from "./booking.interface";
import { User } from "../user/user.model";
import { Bike } from "../bike/bike.model";
import { Booking } from "./booking.model";

const createBookingInToDB = async (
  userData: JwtPayload,
  payload: TBookingPayload
) => {
  const { _id, email, role } = userData;
  const { bikeId, startTime } = payload;

  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found ");
  }

  const bike = await Bike.findById(bikeId);
  if (!bike) {
    throw new Error("Bike not found ");
  }

  const bikeIsAvailable = bike?.isAvailable;
  if (!bikeIsAvailable) {
    throw new Error("This Bike is not available");
  }

  const bookingData = {
    userId: _id,
    bikeId: bikeId,
    startTime: startTime,
  };
  const result = await Booking.create(bookingData);
  return result;
};

// find all booking by user id
const findAllBookingInToDB = async (userData: JwtPayload) => {
  const { _id, email, role } = userData;
  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found ");
  }

  const result = await Booking.find({ userId: _id });
  if (result?.length === 0) {
    throw new Error("You No Booking Bike");
  }
  return result;
};
export const BookingServices = {
  createBookingInToDB,
  findAllBookingInToDB,
};
