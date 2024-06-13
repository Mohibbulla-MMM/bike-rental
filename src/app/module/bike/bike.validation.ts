import { z } from "zod";

const bikeSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .trim()
      .min(1, "Name must be at least 1 character long")
      .max(50, "Name must be at most 50 characters long"),

    description: z
      .string({
        required_error: "Description is required",
      })
      .trim()
      .min(1, "Description must be at least 1 character long")
      .max(500, "Description must be at most 500 characters long"),

    pricePerHour: z
      .number({
        required_error: "Price per hour is required",
      })
      .min(0, "Price per hour must be at least 0"),

    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().default(false),

    cc: z
      .number({
        required_error: "CC is required",
      })
      .min(50, "CC must be at least 50")
      .max(2000, "CC must be at most 2000"),

    year: z
      .number({
        required_error: "Year is required",
      })
      .min(1900, "Year must be at least 1900")
      .max(
        new Date().getFullYear(),
        `Year must be at most ${new Date().getFullYear()}`
      ),

    model: z
      .string({
        required_error: "Model is required",
      })
      .trim()
      .min(1, "Model must be at least 1 character long")
      .max(100, "Model must be at most 100 characters long"),

    brand: z
      .string({
        required_error: "Brand is required",
      })
      .trim()
      .min(1, "Brand must be at least 1 character long")
      .max(100, "Brand must be at most 100 characters long"),
  }),
});

export const BikeValidation = {
  bikeSchema,
};
