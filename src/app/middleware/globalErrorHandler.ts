import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleDuplicateError from "../errors/handleDuplicateError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = err?.message || "Something went wrong";
  let statusCode = 400;
  let errorSource: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    errorSource = simplifiedError?.errorSource;
    message = simplifiedError?.message;
  } else if (err.errorResponse.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    errorSource = simplifiedError?.errorSource;
    message = simplifiedError?.message;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource: errorSource,
    error: err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
