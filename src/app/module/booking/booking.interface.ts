import { Types } from "mongoose";

type TreturnTime = Date | null;

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: TreturnTime;
  totalCost: number;
  isReturned: boolean;
};
