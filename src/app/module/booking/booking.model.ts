import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { Bike } from "../bike/bike.model";

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: "Bike",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    returnTime: {
      type: Date,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

bookingSchema.virtual("Total_cost_so_far_is_running").get(async function () {
  // console.log({ doc });
  // console.log(this);
  try {
    const booking: TBooking = this;
    const bike = await Bike.findById(booking?.bikeId);
    if (!bike) {
      throw new Error("Bike not found !");
    }

    // start and return time with totalCost calculation
    const timeFormat = booking?.startTime;
    const startTime = new Date(timeFormat).getTime() / (1000 * 60 * 60);
    const returnTime = new Date().getTime() / (1000 * 60 * 60);
    const price = bike?.pricePerHour;
    const totalCost = (((returnTime - startTime) * price) as number).toFixed(2);
    console.log({ totalCost });
    return { totalCost };
    // return Number(totalCost);
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
});

bookingSchema.set("toJSON", { virtuals: true });
export const Booking = model<TBooking>("Booking", bookingSchema);
