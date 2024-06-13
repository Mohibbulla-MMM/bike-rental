import { z } from "zod";
import { UserRole } from "./user.constant";

const userSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(20, { message: "Name cannot be more than 20 characters long" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" })
      .min(3, { message: "Email must be at least 3 characters long" })
      .max(30, { message: "Email cannot be more than 30 characters long" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(20, { message: "Password cannot be more than 20 characters long" }),
    phone: z
      .string({ required_error: "Phone number is required" })
      .min(1, { message: "Phone number must be at least 1 character long" })
      .max(20, {
        message: "Phone number cannot be more than 20 characters long",
      }),
    address: z
      .string({ required_error: "Role is required" })
      .min(3, { message: "Address must be at least 3 characters long" })
      .max(50, { message: "Address cannot be more than 50 characters long" }),
    role: z.enum(UserRole as [string]),
  }),
});

const userUpdatedSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(20, { message: "Name cannot be more than 20 characters long" })
      .optional(),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(3, { message: "Email must be at least 3 characters long" })
      .max(30, { message: "Email cannot be more than 30 characters long" })
      .optional(),

    phone: z
      .string()
      .min(1, { message: "Phone number must be at least 1 character long" })
      .max(20, {
        message: "Phone number cannot be more than 20 characters long",
      })
      .optional(),
    address: z
      .string()
      .min(3, { message: "Address must be at least 3 characters long" })
      .max(50, { message: "Address cannot be more than 50 characters long" })
      .optional(),
    role: z.enum(UserRole as [string]).optional(),
  }),
});

export const userValidation = {
  userSchema,
  userUpdatedSchema,
};
