import { Types } from "mongoose";

export interface TBike {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable?: boolean;
  isDeleted?: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
}
