import { z } from "zod";

// bookin  Zod schema
const bookingSchema = z.object({
  body: z.object({
    bikeId: z
      .string({
        required_error: "Bike ID is required.",
        invalid_type_error: "Bike ID must be a valid string.",
      })
      .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: "Bike ID must be a valid ObjectId.",
      }),
    startTime: z.string({
      required_error: "Start time is required.",
      invalid_type_error: "Start time must be a valid date.",
    }),
  }),
});

export const BookingValidataion = {
  bookingSchema,
};

// const bookingSchema1 = z.object({
//   body: z.object({
//     userId: z
//       .string({
//         required_error: "User ID is required.",
//         invalid_type_error: "User ID must be a valid string.",
//       })
//       .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
//         message: "User ID must be a valid ObjectId.",
//       }),

//     bikeId: z
//       .string({
//         required_error: "Bike ID is required.",
//         invalid_type_error: "Bike ID must be a valid string.",
//       })
//       .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
//         message: "Bike ID must be a valid ObjectId.",
//       }),
//     startTime: z.date({
//       required_error: "Start time is required.",
//       invalid_type_error: "Start time must be a valid date.",
//     }),

//     returnTime: z.date().nullable().optional(),

//     totalCost: z
//       .number({
//         required_error: "Total cost is required.",
//         invalid_type_error: "Total cost must be a number.",
//       })
//       .min(0, "Total cost must be at least 0.")
//       .optional(),

//     isReturned: z.boolean().default(false).optional(),
//   }),
// });
