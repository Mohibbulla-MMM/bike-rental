import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSource: TErrorSources = err?.issues.map((issue) => {
    return {
      path: issue?.path?.pop() as string | number,
      message: issue?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation Error",
    errorSource,
  };
};

export default handleZodError;
