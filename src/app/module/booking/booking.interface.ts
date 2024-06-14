import { Types } from "mongoose";
import { TBike } from "../bike/bike.interface";
import { TUser } from "../user/user.interface";

type TreturnTime = Date | null;

export type TBooking = {
  userId: Types.ObjectId | TUser;
  bikeId: Types.ObjectId | TBike;
  startTime: Date;
  returnTime?: TreturnTime;
  totalCost?: number;
  isReturned?: boolean;
};

export type TBookingPayload = { bikeId: Types.ObjectId; startTime: Date };
