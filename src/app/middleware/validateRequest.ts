import { AnyZodObject, ZodAny } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req) => {
    await schema.parseAsync({
      body: req.body,
    });
  });
};

export default validateRequest;
