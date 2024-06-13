import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

// change password schema
const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "old Password is required" }),
    newPassword: z.string({ required_error: "new Password is required" }),
  }),
});

export const AuthValidation = {
  loginSchema,
  changePasswordSchema,
};
