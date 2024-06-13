import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    pricePerHour: {
      type: Number,
      trim: true,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: Number,
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      trim: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Bike = model<TBike>("Bile", bikeSchema);
