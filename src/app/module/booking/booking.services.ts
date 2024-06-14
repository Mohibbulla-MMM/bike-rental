import { JwtPayload } from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import { TBookingPayload } from "./booking.interface";
import { User } from "../user/user.model";
import { Bike } from "../bike/bike.model";
import { Booking } from "./booking.model";
import { TBike } from "../bike/bike.interface";

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

    const updateBikeVailable = await Bike.findByIdAndUpdate(
      { _id: bikeId },
      { isAvailable: false }
    );

    return result;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

// bike return
const updateReurnBikeFromDB = async (id: string) => {
  const session = await mongoose?.startSession();
  try {
    session.startTransaction();
    const booking = await Booking.findById(id).populate<TBike>("bikeId");
    if (!booking) {
      throw new Error("Your Booking not found !");
    }

    const bikeId = booking?.bikeId;
    const updateBikeAvailabe = await Bike.findByIdAndUpdate(
      { _id: bikeId },
      { isAvailable: true },
      { session }
    );

    // start and return time with totalCost calculation
    const timeFormat = booking?.startTime;
    const startTime = new Date(timeFormat).getTime() / (1000 * 60 * 60);
    const returnTime = new Date().getTime() / (1000 * 60 * 60);

    // console.log({ timeFormat });
    // console.log({ startTime });
    // console.log({ returnTime });
    // console.log(returnTime - startTime);

    const bike = booking?.bikeId as TBike; // Type assertion
    const price = bike?.pricePerHour;
    // console.log({ price });
    const totalCost = ((returnTime - startTime) * price).toFixed(2);
    // totalCost: 1834.0212199998787;
    // console.log({ totalCost });

    // booking time, price and isReturn updated
    const updateRentalsBikeReturn = await Booking.findByIdAndUpdate(
      { _id: id },
      {
        returnTime: new Date(),
        totalCost: totalCost,
        isReturned: true,
      },
      { session }
    );

    await session.commitTransaction();
    await session.endSession();
    return updateRentalsBikeReturn;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
    throw new Error(err);
  }
};

// find all booking by user id
const findAllRentalsInToDB = async (userData: JwtPayload) => {
  const { _id, email, role } = userData;
  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found ");
  }

  const result = await Booking.find({ userId: _id });
  if (result?.length === 0) {
    throw new Error("You have not made any bookings yet");
  }
  return result;
};

export const BookingServices = {
  createRentalsInToDB,
  findAllRentalsInToDB,
  updateReurnBikeFromDB,
};
