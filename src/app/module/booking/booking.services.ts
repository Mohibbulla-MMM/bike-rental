import { JwtPayload } from "jsonwebtoken";
import mongoose, { Schema, Types } from "mongoose";
import { TBookingPayload } from "./booking.interface";
import { User } from "../user/user.model";
import { Bike } from "../bike/bike.model";
import { Booking } from "./booking.model";
import { TBike } from "../bike/bike.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// create booking
const createRentalsInToDB = async (
  userData: JwtPayload,
  payload: TBookingPayload
) => {
  try {
    const { _id, email, role } = userData;
    const { bikeId, startTime } = payload;

    const user = await User.findById(_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found ");
    }

    const bike = await Bike.findById(bikeId);
    if (!bike) {
      throw new AppError(httpStatus.NOT_FOUND, "Bike not found ");
    }

    const bikeIsAvailable = bike?.isAvailable;
    if (!bikeIsAvailable) {
      throw new AppError(httpStatus.BAD_REQUEST, "This Bike is not available");
    }

    const bookingData = {
      userId: _id,
      bikeId: bikeId,
      startTime: startTime,
    };
    const result = await Booking.create(bookingData);

    const updateBikeVailable = await Bike.findByIdAndUpdate(
      { _id: bikeId },
      { isAvailable: false }
    );

    return result;
  } catch (err: any) {
    console.log(err);
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

// bike return
const updateReurnBikeFromDB = async (id: string) => {
  const session = await mongoose?.startSession();
  try {
    session.startTransaction();
    const booking = await Booking.findById(id).populate<TBike>("bikeId");
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND,"Your Booking not found !");
    }
    const isReturn = booking?.isReturned;
    if (isReturn) {
      throw new AppError(httpStatus.BAD_REQUEST, `This bike already retured !`);
    }

    const bikeId = booking?.bikeId?._id;
    const updateBikeAvailabe = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: true },
      { session }
    );

    // start and return time with totalCost calculation
    const timeFormat = booking?.startTime;
    const startTime = new Date(timeFormat).getTime() / (1000 * 60 * 60);
    const returnTime = new Date().getTime() / (1000 * 60 * 60);

    const bike = booking?.bikeId as TBike; // Type assertion
    const price = bike?.pricePerHour;
    const totalCost = ((returnTime - startTime) * price).toFixed(2);

    // booking time, price and isReturn updated
    const updateRentalsBikeReturn = await Booking.findByIdAndUpdate(
      { _id: id },
      {
        returnTime: new Date(),
        totalCost: totalCost,
        isReturned: true,
      },
      { new: true, session }
    );

    await session.commitTransaction();
    await session.endSession();
    return updateRentalsBikeReturn;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

// find all booking by user id
const findAllRentalsInToDB = async (userData: JwtPayload) => {
  const { _id, email, role } = userData;
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,"User not found ");
  }

  const result = await Booking.find({ userId: _id });
  if (result?.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have not made any bookings yet"
    );
  }
  return result;
};

export const BookingServices = {
  createRentalsInToDB,
  findAllRentalsInToDB,
  updateReurnBikeFromDB,
};
